const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    feature: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
const Packages = mongoose.model("feature", Schema);
module.exports = Packages;
