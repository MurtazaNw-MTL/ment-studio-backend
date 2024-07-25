const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URL } = process.env;
mongoose.set("strictQuery", true);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
// console.log(MONGO_URL);
mongoose
  .connect(MONGO_URL, options)
  .then((res) => {
    // console.log("***Database connected");
  })
  .catch((e) => {
    console.log("ERROR WHILE CONNECTING DATABSAE \n", e);
  });
