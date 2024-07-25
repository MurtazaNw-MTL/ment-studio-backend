const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"]
    },
    level: {
      type: String,
      enum: ["FIRST", "SECOND", "THIRD"],
      required: true,
      default: "FIRST"
    },
    secondCategoyr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    },
    firstCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    },
    description: {
      type: String,
      required: [true, "Description is Required"]
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    productCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
const Category = mongoose.model("category", Schema);
module.exports = Category;
