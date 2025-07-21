import mongoose from "mongoose";
export const dbCon = () => {
  try {
    mongoose.connect(process.env.DBCON);
    console.log("db connection successfull");
  } catch (err) {
    console.log("dbConnection failed :", err.message);
    process.exit(1);
  }
};
