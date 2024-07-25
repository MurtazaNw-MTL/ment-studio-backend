// ------------------BASE TEMPLATE-----------------------

const express = require("express");
const app = express();
require("../connectDb");
const PORT = process.env.PORT || 5002;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
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
const ProductRoutes = require("./src/routes/product.routes");
const ProductAdminRoutes = require("./src/routes/product.admin.routes");
const CategoryRoutes = require("./src/routes/category.routes");
const PackageRoutes = require("./src/routes/package.routes");
const FeatureRoutes = require("./src/routes/feature.routes");
//  routes
app.use("/v1", ProductRoutes);
app.use("/v1/admin", ProductAdminRoutes);
app.use("/v1/category", CategoryRoutes);
app.use("/v1/package", PackageRoutes);
app.use("/v1/feature", FeatureRoutes);

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));

module.exports = app;
