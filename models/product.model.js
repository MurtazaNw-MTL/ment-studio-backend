const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      minlength: 3
    },
    media: [
      {
        image: {
          type: String
        }
      }
    ],

    packages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages"
      }
    ],
    modular: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feature"
      }
    ],
    modulerBasePrice: {
      type: Number
    },

    isModular: {
      type: Boolean,
      default: false
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },

    addOnsFeatures: [
      {
        amount: Number,
        feature: String
      }
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
      }
    ],
    review: [
      {
        message: String,
        rating: Number
      }
    ],
    shortDescription: {
      type: String,
      required: true,
      minlength: 10,
      maxLength: 100
    },
    longDescription: {
      type: String,

      minlength: 3
    },
    rating: {
      type: Number
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    verificationMessage: {
      type: String,
      default: null
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },

  { timestamps: true }
);
const Product = mongoose.model("product", Schema);

module.exports = Product;
