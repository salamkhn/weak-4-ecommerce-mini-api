import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "productName required"],
  },
  price: {
    type: Number,
    required: [true, "price required"],
  },
  productImage: {
    type: String,
    required: [true, "productImage required"],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  productWeight: {
    type: Number,
  },
  rating: {
    type: Number,
    required: [true, "Rating required"],
  },
  company: {
    type: String,
    enum: [
      "iphone",
      "dell",
      "hp",
      "salamCompany",
      "coca-cola",
      "amazon",
      "ebay",
      "walmart",
      "homedepo",
      "alibaba",
      "sony",
      "zara",
      "nokia",
      "niki",
    ],
    message: (prop) => `${prop.value} is not supported`,
  },
});

export const product = mongoose.model("product", productSchema);
