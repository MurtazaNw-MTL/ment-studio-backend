// ------------------BASE TEMPLATE-----------------------

const express = require("express");
const app = express();
// require("./dbConnect");
const PORT = process.env.PORT || 5003;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// -------------------------------------- REQUIRE ROUTES-----------------------

//  routes

app.listen(PORT, () =>
  console.log("********** ORDER Server is running on PORT:", PORT)
);

module.exports = app;
