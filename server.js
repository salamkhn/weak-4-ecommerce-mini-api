import dotenv from "dotenv";
dotenv.config();

import { dbCon } from "./dbCon/dbCon.js";
dbCon();
import fileUpload from "express-fileupload";
import { errorHandler } from "./middleware/errorHandler.js";

import express from "express";
import { productRouter } from "./route/productRouter.js";

const app = express();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

console.log("process from server.js :", process.env.APIKEY);

app.use("/api/ecom", productRouter);

//errorHandler middleware
app.use(errorHandler);
const port = process.env.PORT || 444;
app.listen(port, () => {
  console.log(`yes listining at ${port}`);
});
