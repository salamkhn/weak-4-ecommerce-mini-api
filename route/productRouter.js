import { Router } from "express";
import { addProduct } from "../controller/productController.js";

export const productRouter = Router();

// @add product
// @method =>post
// @endpoing =>"/api/product/add"
productRouter.post("/add", addProduct);
