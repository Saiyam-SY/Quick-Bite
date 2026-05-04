import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Shop } from "../models/shop.model.js";

export const createAndEditShop = async (req, res) => {
  try {
    const { shopName, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      await Shop.create({
        shopName,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      await Shop.findByIdAndUpdate(
        shop._id,
        {
          shopName,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true },
      );
    }

    await shop.populate("owner");

    return res.status(201).json(shop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Shop creation error", error: error.message });
  }
};
