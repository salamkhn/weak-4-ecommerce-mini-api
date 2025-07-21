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

app.use("/api/ecom", productRouter);

//errorHandler middleware
app.use(errorHandler);
const port = 444;
app.listen(port, () => {
  console.log(`yes listining at ${port}`);
});
