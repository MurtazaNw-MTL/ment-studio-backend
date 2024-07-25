// ------------------BASE TEMPLATE-----------------------

const express = require("express");
const app = express();
const PORT = process.env.port || 5001;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
require("../connectDb");
app.use(cors({ origin: true, credentials: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req._parsedUrl.path, "<<<<< CURRENT API CALL");
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
const AuthRoutes = require("./src/routes/auth.routes");
const UserRoutes = require("./src/routes/user.routes");

// MANAGE CONTROLERS

app.use("/v1/auth", AuthRoutes);
app.use("/v1", UserRoutes);
// app.use("/delete",UserRoutes)

//  routes

app.listen(PORT, () =>
  console.log("********* USER Server is running on PORT:", PORT)
);

module.exports = app;
