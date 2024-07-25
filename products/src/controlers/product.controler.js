const CustomResponse = require("../../../globalMiddleware/Response");
const Validation = require("../../../globalMiddleware/Validations");
const ProductSchema = require("../../../models/product.model");
const uploadOnCloudinary = require("../middleware/cloudinary");
// const Validate=require("../../../")
const createProduct = async (req, res) => {
  try {
    const { title, category, shortDescription } = req.body;
    if (
      !Validation.validateReqField({ title, category, shortDescription }, res)
    )
      return null;
    req.body.seller = req.user._id;
    // console.log()
    const newProduct = new ProductSchema(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.json({ message: "Product added successfully!" });
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};

const getFilteredProduct = async (req, res) => {
  try {
    let filter = req.query;
    filter.isVerified = true;
    filter.isDeleted = false;
    const products = await ProductSchema.find(filter)
      .sort({
        createdAt: -1
      })
      .populate("seller")
      .populate("modular")
      .populate({
        path: "packages",
        populate: {
          path: "features",
          model: "feature"
        }
      });
    if (products.length == 0) {
      CustomResponse.fail(res, "No Products found", products);
    } else {
      CustomResponse.success(res, "Product Fetched Successfully", products);
    }
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const getAllProducts = async (req, res) => {
  try {
    let filter = req.query;
    // filter.isVerified = true;
    // filter.isDeleted = false;
    const products = await ProductSchema.find(filter)
      .sort({
        createdAt: -1
      })
      .populate("seller")
      .populate("category")
      .populate("modular")
      .populate({
        path: "packages",
        populate: {
          path: "features",
          model: "feature"
        }
      });
    if (products.length == 0) {
      CustomResponse.fail(res, "No Products found", products);
    } else {
      CustomResponse.success(res, "Product Fetched Successfully", products);
    }
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Validation.validateReqField({ id }, res)) return null;
    if (req.body.isVerified)
      return CustomResponse.fail(res, "Invalid isVerified Field", null);
    if (req.body.packages)
      return CustomResponse.fail(res, "Invalid packages Field", null);
    if (req.body.seller)
      return CustomResponse.fail(res, "Invalid seller Field", null);
    if (req.body.category)
      return CustomResponse.fail(res, "Invalid category Field", null);
    if (req.body.isDeleted)
      return CustomResponse.fail(res, "Invalid isDeleted Field", null);

    const updated = await ProductSchema.findByIdAndUpdate(id, updatedField, {
      new: true
    });
    CustomResponse.success(res, "Product Updated", updated);
  } catch (error) {
    CustomResponse.fail(res, error.message, null);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!Validation.validateReqField({ id }, res)) return null;
    await ProductSchema.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    CustomResponse.success(res, "Product Successfully Deleted", null);
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};

const deleteAll = async (req, res) => {
  try {
    await ProductSchema.deleteMany(req.query);

    CustomResponse.success(res, "Products Deleted", null);
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};

const updateMedia = async (req, res) => {
  try {
    const image = await uploadOnCloudinary(req.files.image[0]);
    console.log(image, "<<<thisiimage");
    let { data } = await ProductSchema.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          media: { image }
        }
      },
      { new: true }
    );
    CustomResponse.success(res, "Image Uploaded", data);
  } catch (error) {
    console.log(error, "Error");
    CustomResponse.error(res);
  }
};

const addFeaturestoProduct = async (req, res) => {
  try {
    let { id } = req.product;
    const { features } = req.body;

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return CustomResponse.fail(res, "Fields are required to update", null);
    }

    if (!Validation.validateReqField({ features, id }, res)) return null;
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

    const packages = await ProductSchema.findByIdAndUpdate(
      id,
      {
        $push: {
          modular: req.body.features
        }
        // isModular: true
      },
      {
        new: true
      }
    );
    CustomResponse.success(res, "Product Feture Updated", packages);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const PRODUCT_CONTROLER = {
  create: createProduct,
  get: getFilteredProduct,
  getAll: getAllProducts,
  deleteAll,
  deleteProduct,
  update: updateProduct,
  updateMedia: updateMedia,
  addFeature: addFeaturestoProduct
};
module.exports = PRODUCT_CONTROLER;
