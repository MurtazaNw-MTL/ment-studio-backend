const CustomResponse = require("../../../globalMiddleware/Response");
const Validation = require("../../../globalMiddleware/Validations");
const PackageSchema = require("../../../models/modular.model");
const ProductSchema = require("../../../models/product.model");

// const Validate=require("../../../")
const create = async (req, res) => {
  try {
    const { name, features, amount, productId } = req.body;
    req.body.seller = req.user._id;
    if (
      !Validation.validateReqField({ name, features, amount, productId }, res)
    )
      return null;
    const newPackage = new PackageSchema(req.body);
    await newPackage.save();
    await ProductSchema.findByIdAndUpdate(
      productId,
      {
        packages: newPackage._id
      },
      { new: true }
    );
    CustomResponse.success(res, "Package Created Successfully", newPackage);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const get = async (req, res) => {
  try {
    let filter = req.query;
    filter.isDeleted = false;
    const package = await PackageSchema.find(filter).sort({
      createdAt: -1
    });
    if (package.length == 0)
      return CustomResponse.fail(res, "No Package Found", []);
    CustomResponse.success(res, "Package Fetched", package);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const update = async (req, res) => {
  try {
    let { id } = req.package;

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return CustomResponse.fail(res, "Fields are required to update", null);
    }

    if (req.body.seller)
      return CustomResponse.fail(
        res,
        "Invalid Field (Seller) can not be updated"
      );

    if (req.body.productId)
      return CustomResponse.fail(
        res,
        "Invalid Field (productId) can not be updated"
      );

    const packages = await PackageSchema.findByIdAndUpdate(id, req.body, {
      new: true
    });
    CustomResponse.success(res, "Package Updated", packages);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const Delete = async (req, res) => {
  try {
    let { id } = req.params;
    if (!Validation.validateReqField({ id }, res)) return null;
    const Packages = await PackageSchema.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      {
        new: true
      }
    );
    CustomResponse.success(res, "Package Deleted", Packages);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const MODULAR_CONTROLER = {
  create: create,
  get: get,
  delete: Delete,
  update
};
module.exports = MODULAR_CONTROLER;
