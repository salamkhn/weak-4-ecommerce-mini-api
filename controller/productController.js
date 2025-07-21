import joi from "joi";
import { product } from "../model/productModel.js";
import path from "path";

import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res, next) => {
  console.log("hello salma kasa huu app");
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
    //Cloudinary set ups
    cloudinary.config({
      cloud_name: "djboaeuys",
      api_key: process.env.APIKEY,
      api_secret: process.env.APISECRETE,
    });

    console.log("process from contriller.js :", process.env.APIKEY);
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

    //success status
    return res.status(201).json({
      message: "product stored successfully",
      productDetail,
    });
  } catch (err) {
    next(err);
  }
};

// show all-products

export const showallProducts = async (req, res, next) => {
  try {
    let {
      page,
      limit = 3,
      productName,
      price,
      isFeatured,
      productWeight,
      rating,
      company,
    } = req.query;

    console.log("page in query :", req.query);

    //converting in to Numerbs
    let skip;
    page = Number(page);
    limit = Number(limit);
    skip = (page - 1) * limit;

    //mading query object so that we can easily manipulate
    const queryObject = {};
    let allProducts;

    if (page) {
      console.log("page :", page);
      console.log("limit :", limit);
      console.log("skip :", skip);
    }
    if (productName) {
      queryObject.productName = { $regex: productName, $options: "i" };
    }
    if (price) {
      queryObject.price = Number(price);
    }
    if (isFeatured) {
      queryObject.isFeatured = isFeatured === true;
    }
    if (productWeight) {
      queryObject.productWeight = Number(productWeight);
    }
    if (rating) {
      queryObject.rating = Number(rating);
    }
    if (company) {
      queryObject.company = { $regex: company, $options: "i" };
    }

    allProducts = page
      ? (allProducts = await product.find().skip(skip).limit(limit))
      : await product.find(queryObject);

    console.log("allProducts :", allProducts);

    if (!allProducts || allProducts.length == 0) {
      return res.status(400).json({
        message: "product not found",
        success: false,
      });
    }

    // success status
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
