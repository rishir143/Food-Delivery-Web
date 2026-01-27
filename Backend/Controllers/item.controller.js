import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodtype, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(201).json(item);
    }

    const item = await Item.create({
      name,
      category,
      foodtype,
      price,
      image,
      shop: shop._id,
    });
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: `item controller error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = re;
    qs.params.itemId;
    const { name, category, foodtype, price } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        foodtype,
        price,
        image,
      },
      { new: true }
    );
    if (!item) {
      return res.status(400).json({ message: `item not found` });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `Edit item error ${error}` });
  }
};
