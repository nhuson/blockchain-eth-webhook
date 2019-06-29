require("dotenv").config({ path: ".env" });
import mongoose from "mongoose";

export default () => {
  mongoose
    .connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/gateway-v3-dev",
      { useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
  mongoose.set("useFindAndModify", false);
  return mongoose;
};
