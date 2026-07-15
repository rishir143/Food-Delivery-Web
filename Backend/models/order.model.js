import mongoose from "mongoose";

const shopOrderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    name: String,
    quantity: Number,
    price: Number,
  },
  { timestamps: true },
);

const shopOrderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTotal: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "out of delivery", "delivered"],
      default: "pending",
    },

    shopOrderItems: [shopOrderItemSchema],

    assigment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "delivery",
      default: null,
    },

    assignedBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    delOtp: {
      type: String,
      default: null,
    },

    otpexpires: {
      type: Date,
    },

    deliveryAt: {
      type: Date,
    },
  },
  { timestamps: true },
);
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    deliveryAddress: {
      text: String,
      longitude: Number,
      latitude: Number,
    },
    totalAmount: {
      type: Number,
    },
    shopOrders: [shopOrderSchema],
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
