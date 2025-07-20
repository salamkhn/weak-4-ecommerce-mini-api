import joi from "joi";
import { product } from "../model/productModel.js";
export const productSchema = joi.object({
  productName: joi.string().required(),
  price: joi.string().required(),
  productImage: joi.string().required(),
  isFeatured: joi.boolean(),
  productWeight: joi.number().required(),
  rating: joi.number().required(),
  company: joi.string().required(),
});
export const addProduct = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      messge: error.details[0].message,
    });
  }
  try {
    const {
      productName,
      price,
      productImage,
      isFeatured,
      productWeight,
      rating,
    } = req.body;

    const productDetail = {
      productName,
      price,
      productImage,
      isFeatured,
      productWeight,
      rating,
    };

    await productDetail.save();
    //save to dbs

    return res.status(201).json({
      message: "product stored successfully",
      productDetail,
    });
  } catch (err) {
    next(err);
  }
};
