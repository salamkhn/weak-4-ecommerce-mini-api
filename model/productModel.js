import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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
      enum: {
        values: [
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
          "nokia",
        ],
        message: (props) => `${props.value} is not supported`,
      },
    },
  },
  { timestamps: true }
);

export const product = mongoose.model("product", productSchema);
