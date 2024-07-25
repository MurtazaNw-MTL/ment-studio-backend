const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"]
    },
    image: String,
    features: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feature"
      }
    ],
    shortDescription: {
      type: String
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
    }
  },
  { timestamps: true }
);
const Packages = mongoose.model("packages", Schema);
module.exports = Packages;
