import mongoose from "mongoose";
export const dbCon = () => {
  try {
    mongoose.connect(
      "mongodb://motivation3272:QcY51TmKoqwU2F4W@ac-gnfz8l9-shard-00-00.q7xksef.mongodb.net:27017,ac-gnfz8l9-shard-00-01.q7xksef.mongodb.net:27017,ac-gnfz8l9-shard-00-02.q7xksef.mongodb.net:27017/minibackendapi?replicaSet=atlas-fba30y-shard-0&ssl=true&authSource=admin"
    );
    console.log("db connection successfull");
  } catch (err) {
    console.log("dbConnection failed :", err.message);
    process.exit(1);
  }
};
