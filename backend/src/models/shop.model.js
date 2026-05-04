import mongoose, { model } from "mongoose";
const shopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true },
);

export const Shop = mongoose.model("Shop", shopSchema);
