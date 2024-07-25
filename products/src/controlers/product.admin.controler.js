const CustomResponse = require("../../../globalMiddleware/Response");
const Validation = require("../../../globalMiddleware/Validations");
const ProductSchema = require("../../../models/product.model");
const CategorySchema = require("../../../models/productCategory.model");
const PackageSchema = require("../../../models/packages.model");
// const Validate=require("../../../")
const verifyProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { isVerified } = req.body;
    if (!Validation.validateReqField({ productId, isVerified }, res))
      return null;
    const data = await ProductSchema.findByIdAndUpdate(
      productId,
      {
        ...req.body
      },
      { new: true }
    );
    CustomResponse.success(res, "Product Updated", data);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const deleteAllPackage = async (req, res) => {
  try {
    await PackageSchema.deleteMany(req.query);

    CustomResponse.success(res, "Packages Deleted", null);
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};
const deleteAllCategory = async (req, res) => {
  try {
    await CategorySchema.deleteMany(req.query);

    CustomResponse.success(res, "Category Deleted", null);
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};

const getAllPackage = async (req, res) => {
  try {
    const packages = await PackageSchema.find(req.query);
    if (!packages.length)
      return CustomResponse.fail(res, "No Packages Found", null);
    CustomResponse.success(res, "Package Fetched", packages);
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await CategorySchema.find(req.query);
    if (!categories.length)
      return CustomResponse.fail(res, "No Category Found", null);
    CustomResponse.success(res, "Categories Fetched", categories);
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};

const PRODUCT_ADMIN_CONTROLER = {
  adminVerification: verifyProduct,
  adminDeleteAllPackages: deleteAllPackage,
  adminDeleteAllCategory: deleteAllCategory,
  adminGetAllPackages: getAllPackage,
  adminGetAllCategory: getAllCategory
};
module.exports = PRODUCT_ADMIN_CONTROLER;
