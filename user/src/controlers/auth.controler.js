const User = require("../../../models/user.model");
const Validation = require("../../../globalMiddleware/Validations");
const CustomResponse = require("../../../globalMiddleware/Response");
const bcrypt = require("bcrypt");

const getHashedVal = async (pass) => {
  let encryptPass = await bcrypt.hash(pass, 10);
  return encryptPass;
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, loginMethod, role, password } =
      req.body;
    let reqFields = {
      fullName,
      email,
      mobileNumber,
      password,
      loginMethod,
      role
    };
    //  VALIDATE FIELD
    if (!Validation.validateReqField(reqFields, res)) return null;

    //  CHECK PASSWORD LENGTH
    let validatePass = Validation.password(password);
    if (typeof validatePass == "string")
      return CustomResponse.fail(res, validatePass, null);

    //  hash the password
    req.body.password = await getHashedVal(password);
    let newUser = new User({
      ...req.body
    });

    // SAVE IN DB
    const saveIt = await newUser.save();
    let sendThisUser = { ...newUser._doc };
    delete sendThisUser.password;
    if (saveIt) {
      let token = await Validation.generateToken({
        _id: sendThisUser._id,
        email: sendThisUser.email,
        role: sendThisUser.role
      });

      CustomResponse.success(res, "User Created", {
        ...sendThisUser,
        token: token
      });
    } else CustomResponse.fail(res, "Failed", null);
    // else CustomResponse.fail(res,)
  } catch (error) {
    CustomResponse.error(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reqField = { email, password };
    if (!Validation.validateReqField(reqField, res)) return null;
    let user = await User.findOne({ email });
    if (!user)
      return CustomResponse.fail(res, "Invalid Email / Password", null);
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass)
      return CustomResponse.unauthorized(res, "Invalid Email / Password");

    let userData = { ...user._doc };
    const token = await Validation.generateToken({
      _id: userData._id,
      email: userData.email,
      role: userData.role
    });
    delete userData.password;
    CustomResponse.success(res, "Loggedin successfull", { ...userData, token });
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};

const getUser = (req, res) => {
  CustomResponse.success(res, "message", []);
};

const getOneUser = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) return CustomResponse.fail(res, "User does not exist", null);
    let userData = { ...user._doc };
    delete userData.password;
    CustomResponse.success(res, "User Fetched", userData);
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};

const AUTH_CONTROLER = {
  registerUser,
  get: getUser,
  login: login,
  getOneUser
};
module.exports = AUTH_CONTROLER;
