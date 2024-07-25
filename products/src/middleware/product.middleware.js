const CustomResponse = require("../../../globalMiddleware/Response");
const Package_Schema = require("../../../models/packages.model");
const PRODUCT_SCHEMA = require("../../../models/product.model");

const VerifyProductUpdation = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) return CustomResponse.error(res, "id (product id) is required");
    const product = await PRODUCT_SCHEMA.findById(id);
    
    if (product.seller != req.user._id) {
      return CustomResponse.fail(
        res,
        "You are not allowed to Update this product. Please contact to admin"
      );
    } else {
      req.product = product;
      next();
    }
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};

const VerifyPackageUpdation = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) return CustomResponse.error(res, "id (package id) is required");
    const packages = await Package_Schema.findById(id);
    // console.log(packages, "<<<package");
    if (packages.seller != req.user._id) {
      return CustomResponse.fail(
        res,
        "You are not allowed to Update this package. Please contact to admin"
      );
    } else {
      req.package = packages;
      next();
    }
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};
const PRODUCT_MIDDLEWARE = {
  VerifyProductUpdation,
  VerifyPackageUpdation
};
module.exports = PRODUCT_MIDDLEWARE;
