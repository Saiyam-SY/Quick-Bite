import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Item } from "../models/item.model.js";
import { Shop } from "../models/shop.model.js";

export const addItem = async (req, res) => {
  try {
    const { itemName, category, price, foodType } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "shop not found" });
    }
    const item = await Item.create({
      itemName,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });

    return res.status(201).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Adding item error", error: error.message });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const { itemName, category, price, foodType } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      {
        itemName,
        category,
        price,
        foodType,
        image,
      },
      { new: true },
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found to edit error" });
    }

    return res.status(201).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Adding item error", error: error.message });
  }
};
