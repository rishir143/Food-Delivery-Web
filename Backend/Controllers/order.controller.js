import Shop from "../models/shop.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import delivery from "../models/deliveryAssignment.js";
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, totalAmount, deliveryAddress } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ error: "Cart items must be a non-empty array." });
    }
    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({ error: "Delivery address is required" });
    }
    console.log(deliveryAddress);

    const groupItemsByshop = {};
    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByshop[shopId]) {
        groupItemsByshop[shopId] = [];
      }
      groupItemsByshop[shopId].push(item);
    });

    const shopOrders = await Promise.all(
      Object.keys(groupItemsByshop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) {
          throw new Error(`Shop with id ${shopId} not found`);
        }
        if (!shop.owner) {
          throw new Error(`Owner of shop with id ${shopId} not found`);
        }
        const items = groupItemsByshop[shopId];

        const totalAmount = items.reduce(
          (sum, item) => sum + Number(item.price) * Number(item.quantity),
          0,
        );

        return {
          shop: shop._id,
          owner: shop.owner,
          subTotal: totalAmount,
          shopOrderItems: items.map((item) => ({
            item: item.items?._id || item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        };
      }),
    );

    try {
      const newOrder = await Order.create({
        user: req.userId || req.user?._id,
        paymentMethod,
        deliveryAddress,
        totalAmount,
        shopOrders,
      });
      await newOrder.populate([
        {
          path: "shopOrders.shopOrderItems.item",
          select: "name image price",
        },
        {
          path: "shopOrders.shop",
          select: "name",
        },
      ]);

      return res.status(200).json(newOrder);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `place new order error ${error}` });
    }
  } catch (error) {
    return res.status(500).json({ message: `place order error ${error}` });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role == "user") {
      const order = await Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("shopOrders.shop", "name")
        .populate("shopOrders.owner", "name email mobile")
        .populate(
          "shopOrders.shopOrderItems.item",
          "name price quantity image",
        );
      return res.status(200).json(order);
    } else if (user.role == "owner") {
      const order = await Order.find({
        "shopOrders.owner": userId,
      })
        .sort({ createdAt: -1 })
        .populate("shopOrders.shop", "name")
        .populate("user", "fullname email mobile")
        .populate(
          "shopOrders.shopOrderItems.item",
          "name price quantity image",
        );

      const filteredOrders = order.map((order) => ({
        _id: order._id,
        paymentMethod: order.paymentMethod,
        user: order.user,
        shopOrders: order.shopOrders.find((o) => o.owner._id == req.userId),
        createdAt: order.createdAt,
        deliveryAddress: order.deliveryAddress,
      }));
      return res.status(200).json(filteredOrders);
    }
  } catch (error) {
    return res.status(500).json({ message: `get my orders error ${error}` });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    // find Order
    const shoporder = order.shopOrders.find((o) => o.shop == shopId);
    if (!shoporder) {
      return res
        .status(404)
        .json({ success: false, message: "No shop order found" });
    }

    shoporder.status = status;

    if (status === "out of delivery" && !shoporder.assigment) {
      const { longitude, latitude } = order.deliveryAddress;
      if (!longitude || !latitude) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid delivery coordinates" });
      }

      // 🗺️ find nearby delivery boys
      const nearbyboys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: 50000, // 5km radius
          },
        },
      }).limit(20);

      if (!nearbyboys.length) {
        return res
          .status(400)
          .json({ success: false, message: "No nearby delivery boys found" });
      }
      const nearbyids = nearbyboys.map((b) => b._id);

      const busyids = await delivery
        .find({
          assignedTo: { $in: nearbyids },
          status: { $nin: ["brodcasted", "completed"] },
        })
        .distinct("assignedTo");

      const busyset = new Set(busyids.map((id) => String(id)));
      const freeboys = nearbyboys.filter((b) => !busyset.has(String(b._id)));

      if (!freeboys.length) {
        return res.status(400).json({
          success: false,
          message: "All delivery boys are currently busy",
        });
      }

      const candidateIds = freeboys.map((b) => b._id);
    }

    await shoporder.save();
    await order.save();

    return res.status(200).json(shoporder.status);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Occurs in Update order status` });
  }
};
