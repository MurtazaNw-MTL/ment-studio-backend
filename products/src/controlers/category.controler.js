const CustomResponse = require("../../../globalMiddleware/Response");
const Validation = require("../../../globalMiddleware/Validations");
const Category = require("../../../models/productCategory.model");
// const Validate=require("../../../")
const create = async (req, res) => {
  try {
    const { name, description, level } = req.body;
    let reqField = { name, description, level };
    if (level == "THIRD") {
      reqField.firstCategory = req.body.firstCategory;
      reqField.secondCategory = req.body.secondCategory;
    }
    if (level == "SECOND") {
      reqField.firstCategory = req.body.firstCategory;
    }
    if (!Validation.validateReqField(reqField, res)) return null;

    const newCategory = new Category(req.body);
    await newCategory.save();
    CustomResponse.success(res, "Category Created Successfully", newCategory);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const get = async (req, res) => {
  try {
    let filter = req.query;
    filter.isDeleted = false;
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
    const categories = await Category.find(filter);
    CustomResponse.success(res, "Category Fetched", categories);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const update = async (req, res) => {
  try {
    let { id } = req.body;
    if (!Validation.validateReqField({ id }, res)) return null;
    const categories = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    });
    CustomResponse.success(res, "Category Updated", categories);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};
const Delete = async (req, res) => {
  try {
    let { id } = req.params;
    if (!Validation.validateReqField({ id }, res)) return null;
    const categories = await Category.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      { new: true }
    );
    CustomResponse.success(res, "Category Deleted", categories);
  } catch (error) {
    console.log(error.message);
    CustomResponse.error(res, error.message, null);
  }
};

const CATEGORY_CONTROLER = {
  create: create,
  get: get,
  delete: Delete,
  update
};
module.exports = CATEGORY_CONTROLER;
