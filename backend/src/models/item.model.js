import mongoose, { model } from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Appetizers",
        "Main Course",
        "Beverages",
        "Desserts",
        "Fast Food",
        "Breakfast",
        "Vegetarian",
        "Non-Vegetarian",
        "Vegan",
        "Gluten-Free",
        "Snacks",
        "Healthy Choices",
      ],
      required: true,
    },

    price: {
      type: Number,
      min: 0,
      required: true,
    },

    foodType: {
      type: String,
      enum: ["Veg", "Non-Veg"],
    },
  },
  { timestamps: true },
);

export const Item = mongoose.model("Item", itemSchema);
