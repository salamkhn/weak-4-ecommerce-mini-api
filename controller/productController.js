import joi from "joi";
import { product } from "../model/productModel.js";
import path from "path";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "djboaeuys",
  api_key: "297579552564668",
  api_secret: "PIx5qMF_9Q_jvrAQPbTsgTju3Ok",
});
export const addProduct = async (req, res, next) => {
  const { productName, price, isFeatured, productWeight, rating, company } =
    req.body;

  const productSchema = joi.object({
    productName: joi.string().required(),
    price: joi.required(),

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
    //multer setup
    let productDetail;
    const file = req.files.productImage;
    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log("result from cloudinary :", result);
      productDetail = await product.create({
        productName,
        price,
        productImage: result.url,
        isFeatured,
        productWeight,
        rating,
        company,
      });
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

// show all-products

export const showallProducts = async (req, res) => {
  try {
    const allProducts = await product.find({});

    console.log("allProducts :", addProduct);

    if (!allProducts || allProducts.length == 0) {
      return res.status(400).json({
        message: "not any product found",
        success: false,
      });
    }

    console.log("all-products :", allProducts);
    return res.status(200).json({
      message: "these all products found",
      allProducts,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//get product by id
export const getproductbyId = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("id :", id);

    const productbyid = await product.findById(id);

    //validation
    if (!productbyid) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
    console.log("productbyid :", productbyid);
    //success response
    return res.status(200).json({
      message: "this product found",
      productbyid,
    });
  } catch (err) {
    next(err);
  }
};

//update product by id
export const updateproductbyId = async (req, res) => {
  try {
    const { productName, price, isFeatured, productWeight, rating, company } =
      req.body;

    const id = req.params.id;

    console.log("id :", id);

    const productbyid = await product.findByIdAndUpdate(
      id,
      { productName, price, isFeatured, productWeight, rating, company },
      { new: true }
    );

    //validation
    if (!productbyid) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
    console.log("productbyid :", productbyid);
    //success response
    return res.status(200).json({
      message: "product found",
      productbyid,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//delete by id
export const deleteproductbyId = async (req, res) => {
  const id = req.params.id;

  const productbyid = await product.findByIdAndDelete(id);

  //validation
  if (!productbyid) {
    return res.status(404).json({
      message: "product not found",
      success: false,
    });
  }

  //success response
  return res.status(200).json({
    message: "product deleted",
    success: true,
  });
};
