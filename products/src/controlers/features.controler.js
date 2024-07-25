const CustomResponse = require("../../../globalMiddleware/Response");
const Validation = require("../../../globalMiddleware/Validations");
const Feature_schema = require("../../../models/features.model");
// const Validate=require("../../../")
const create = async (req, res) => {
  try {
    const { feature, amount, productId } = req.body;
    if (!Validation.validateReqField({ feature, amount, productId }, res))
      return null;
    const newFeature = new Feature_schema(req.body);
    await newFeature.save();
    CustomResponse.success(res, "Feature Created Successfully", newFeature);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const get = async (req, res) => {
  try {
    let filter = req.query;
    // filter.isDeleted = false;
    const searchTerm = req.query.search;
    if (req.query.search) {
      filter = {
        ...filter,
        $or: [
          {
            name: { $regex: searchTerm, $options: "i" }
          }
        ]
      };
    }
    const features = await Feature_schema.find(filter);
    CustomResponse.success(res, "Feature Fetched", features);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const update = async (req, res) => {
  try {
    let { id } = req.body;
    if (!Validation.validateReqField({ id }, res)) return null;
    const Features = await Feature_schema.findByIdAndUpdate(id, req.body, {
      new: true
    });
    CustomResponse.success(res, "Features Updated", Features);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const Delete = async (req, res) => {
  try {
    let { id } = req.params;
    if (!Validation.validateReqField({ id }, res)) return null;
    const feature = await Feature_schema.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      { new: true }
    );
    CustomResponse.success(res, "Feature Deleted", feature);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const Feature_Controler = {
  create: create,
  get: get,
  delete: Delete,
  update
};
module.exports = Feature_Controler;
