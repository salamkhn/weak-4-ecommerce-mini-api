import { Router } from "express";
import {
  addProduct,
  deleteproductbyId,
  getproductbyId,
  showallProducts,
  updateproductbyId,
} from "../controller/productController.js";

export const productRouter = Router();

// @add product
// @method =>post
// @endpoing =>"/api/product/add"
productRouter.post("/addproduct", addProduct);

// @show showallProducts
// @method =>get
// @endpoint =>/api/ecom/products
productRouter.get("/showallproducts", showallProducts);

// @get products by id
// @method =>get
// @endpoint =>/api/ecom/getproductbyId/:id
productRouter.get("/getproductbyId/:id", getproductbyId);

// @get products by id and update
// @method =>put
// @endpoint =>/api/ecom/updateproductbyId/:id
productRouter.put("/updateproductbyId/:id", updateproductbyId);

// @get products by id and delete
// @method =>delete
// @endpoint =>/api/ecom/deleteproductbyId/:id
productRouter.delete("/deleteproductbyId/:id", deleteproductbyId);
