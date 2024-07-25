const CustomResponse = require("../../../globalMiddleware/Response");
const Validation = require("../../../globalMiddleware/Validations");
const PackageSchema = require("../../../models/packages.model");
const ProductSchema = require("../../../models/product.model");
const uploadOnCloudinary = require("../middleware/cloudinary");

// const Validate=require("../../../")
const create = async (req, res) => {
  try {
    const { name, amount, productId } = req.body;
    req.body.seller = req.user._id;
    if (!Validation.validateReqField({ name, amount, productId }, res))
      return null;
    const newPackage = new PackageSchema(req.body);
    await newPackage.save();
    await ProductSchema.findByIdAndUpdate(
      productId,
      {
        $push: { packages: newPackage._id }
      },
      { new: true }
    );
    // await ProductSchema.findByIdAndUpdate(productId, {
    //   packages:
    // });
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
    const package = await PackageSchema.find(filter)
      .sort({
        createdAt: -1
      })
      .populate("features");
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

    let updatedField = req.body;

    const packages = await PackageSchema.findByIdAndUpdate(id, updatedField, {
      new: true
    });
    CustomResponse.success(res, "Package Updated", packages);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const addFeatures = async (req, res) => {
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

    let updatedField = req.body;

    const packages = await PackageSchema.findByIdAndUpdate(
      id,
      {
        $push: {
          features: req.body.features
        }
      },
      {
        new: true
      }
    );
    CustomResponse.success(res, "Package Updated", packages);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const updateMedia = async (req, res) => {
  try {
    let { id } = req.package;

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return CustomResponse.fail(res, "Fields are required to update", null);
    }
    const image = await uploadOnCloudinary(req.files.image[0]);
    console.log(image, "<<<thisiimage");

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

    const packages = await PackageSchema.findByIdAndUpdate(
      id,
      { image },
      {
        new: true
      }
    );
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

const PACKAGE_CONTROLER = {
  create: create,
  get: get,
  delete: Delete,
  updateMedia,
  update,
  addFeatures
};
module.exports = PACKAGE_CONTROLER;
