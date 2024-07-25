const User = require("../../../models/user.model");
const Validation = require("../../../globalMiddleware/Validations");
const CustomResponse = require("../../../globalMiddleware/Response");

const getAllUser = async (req, res, next) => {
  try {
    console.log("usersss");
    let page = 0;
    if (req.query.page) page = req.query.page;
    // console.log(page);
    // CustomResponse.success(res, "asdf", []);
    const searchTerm = req.query.search;
    let filter = req.query;
    if (req.query.search) {
      filter = {
        ...filter,
        $or: [
          {
            fullName: { $regex: searchTerm, $options: "i" }
          },
          {
            mobileNumber: { $regex: searchTerm, $options: "i" }
          },
          {
            email: { $regex: searchTerm, $options: "i" }
          }
        ]
      };
    }
    let users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);
    // console.log("asdf");
    if (!users.length) return CustomResponse.fail(res, "No User Found", null);
    CustomResponse.success(res, "User Fetched", users);
  } catch (error) {}
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!Validation.validateReqField({ userId: id }, res)) return null;

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser)
      return CustomResponse.fail(res, "Error while deleting User");
    CustomResponse.success(res, "User Deleted", null);
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};

const blockUser = async (req, res, next) => {
  const id = req.body.id;
  const { status, message } = req.body;
  console.log(status);
  if (
    !Validation.validateReqField(
      { userId: id, status: status, message: message },
      res
    )
  )
    return null;

  let blockUser = await User.findByIdAndUpdate(id, {
    isBlocked: {
      status: req.body.status,
      message: req.body.message
    }
  });
  if (blockUser) {
    CustomResponse.success(res, "User Blocked", null);
  } else {
    CustomResponse.fail(res, "Error while blocking the user", null);
  }
};
const verifyUser = async (req, res, next) => {
  const id = req.body.id;
  const { status } = req.body;
  console.log(status);
  if (!Validation.validateReqField({ userId: id, status: status }, res))
    return null;

  let blockUser = await User.findByIdAndUpdate(id, {
    isVerified: status
  });
  if (blockUser) {
    CustomResponse.success(res, "Status Updated", null);
  } else {
    CustomResponse.fail(res, "Error while Updating the user", null);
  }
};

const updateUserDetails = async (req, res, next) => {
  try {
    // const {id} =req.body
    let id = req.user._id;
    if (!id) return CustomResponse.fail(res, "Error while updating", null);
    if (req.body.email)
      return CustomResponse.fail(res, "EMAIL can't be updated");
    if (req.body.password)
      return CustomResponse.fail(res, "Password can't be updated");
    if (req.body.role) return CustomResponse.fail(res, "Role can't be updated");
    if (req.body.mobileNumber)
      return CustomResponse.fail(res, "Mobile Number can't be updated");
    if (req.body.loginMethod)
      return CustomResponse.fail(res, "Login Method can't be updated");
    if (req.body.isBlocked)
      return CustomResponse.fail(res, "Invalid Fields, can't be updated");

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!updatedData)
      return CustomResponse.fail(res, "Error while updating data", null);

    CustomResponse.success(res, "User data updated", updatedData);
    // if(!Validation.validateReqField({userId}))
  } catch (error) {
    CustomResponse.error(res, error.message, null);
  }
};
const deleteAll = async (req, res) => {
  try {
    await User.deleteMany(req.query);
    CustomResponse.success(res, "Users Deleted", null);
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, error.message, null);
  }
};

const USER_CONTROLER = {
  getAllUser,
  deleteUser,
  blockUser,
  updateUserDetails,
  deleteAll,
  VerifyUser: verifyUser
};

module.exports = USER_CONTROLER;
