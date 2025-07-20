import { dbCon } from "./dbCon/dbCon.js";
import { errorHandler } from "./middleware/errorHandler.js";
dbCon();

import express from "express";
import { productRouter } from "./route/productRouter.js";

const app = express();

app.use("/api/product", productRouter);

//errorHandler middleware
app.use(errorHandler);
const port = 444;
app.listen(port, () => {
  console.log(`yes listining at ${port}`);
});
