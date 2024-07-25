var jwt = require("jsonwebtoken");
const CustomResponse = require("./Response");
const User = require("../models/user.model");

const { JWT_SECRET } = process.env;

const validateReqField = (fields, res) => {
  try {
    let flag = true;
    for (const key in fields) {
      const element = fields[key];
      console.log(element, "<<<element");
      const valid =
        element == "undefined" || element == undefined ? false : true;
      if (!valid) {
        res.status(400).send({ success: false, message: `${key} is required` });
        flag = false;
        break;
      }
    }
    return flag;
  } catch (error) {}
};
const checkPassword = (password) => {
  // Regular expression pattern
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Check if the password contains at least one numeric digit
  if (!/\d/.test(password)) {
    return "Password must contain at least one numeric digit.";
  }

  // If all requirements are met, return true (password is valid)
  return true;

  return passwordPattern.test(password);
};

const generateToken = async (data) => {
  console.log("------> thisis jwt----", JWT_SECRET);
  let token = await jwt.sign(data, JWT_SECRET);
  return token;
};

const decodeToken = async (req, res, next) => {
  try {
    const authHeader = String(req.headers["authorization"] || "");
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      var decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } else {
      CustomResponse.fail(
        res,
        "API is secured with a token-based authentication mechanism.",
        null
      );
    }
  } catch (error) {
    CustomResponse.error(
      res,
      "API is secured with a token-based authentication mechanism.",
      null
    );
  }
};

const verifyAdmin = async (req, res, next) => {
  let { role } = req.user;
  console.log(req.user.role);
  if (role == "ADMIN") {
    next();
  } else {
    CustomResponse.unauthorized(res, "You are not authorized to access API");
  }
};

const verifyUser = async (req, res, next) => {
  const { role, _id } = req.user;
  console.log(req.user.role);
  let user = await User.findById(_id);
  console.log(user);
  if (!user) return CustomResponse.fail(res, "Invalid User", null);
  if (user.isBlocked.status == true) {
    CustomResponse.unauthorized(res, "You have been blocked by the admin");
  } else if (role == "USER") {
    next();
  } else {
    CustomResponse.unauthorized(res, "You are not authorized to access API");
  }
};

const Validation = {
  validateReqField,
  password: checkPassword,
  generateToken,
  validateToken: decodeToken,
  verifyAdmin,
  verifyUser
};

module.exports = Validation;
