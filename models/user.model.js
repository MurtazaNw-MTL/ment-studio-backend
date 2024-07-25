const mongoose = require("mongoose");
var validator = require("validator");
const Schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address"
      }
    },
    password: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, "any", { strictMode: false }),
        message: "Invalid mobile number"
      }
    },
    company: {
      type: String,
      default: null
    },
    sellerVerification: {
      type: String,
      enum: ["NOT_APPLIED", "VERIFIED", "PENDING", "REJECTED"]
    },
    loginMethod: {
      type: String,
      enum: ["METAMASK", "GOOGLE", "EMAIL"]
    },
    about: {
      type: String
    },
    profileImage: {
      type: String
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER"]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      status: {
        type: Boolean,
        default: false
      },
      message: String
    },
    productCount: { type: Number, default: 0 }
    // Add other user properties as needed
  },
  { timestamps: true }
);

const User = mongoose.model("user", Schema);

module.exports = User;
