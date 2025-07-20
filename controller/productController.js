import joi from "joi";
import { product } from "../model/productModel.js";

export const addProduct = async (req, res, next) => {
  const {
    productName,
    price,
    productImage,
    isFeatured,
    productWeight,
    rating,
    company,
  } = req.body;

  const productSchema = joi.object({
    productName: joi.string().required(),
    price: joi.required(),
    productImage: joi.string().required(),
    isFeatured: joi.boolean(),
    productWeight: joi.number().required(),
    rating: joi.number().required(),
    company: joi.string().required(),
  });
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      messge: error.details[0].message,
    });
  }
  try {
    const productDetail = await product.create({
      productName,
      price,
      productImage,
      isFeatured,
      productWeight,
      rating,
      company,
    });
    //save to dbs

    return res.status(201).json({
      message: "product stored successfully",
      productDetail,
    });
  } catch (err) {
    next(err);
  }
};
