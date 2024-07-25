const express = require("express");
const AuthControler = require("../controlers/auth.controler");
const Validation = require("../../../globalMiddleware/Validations");
const USER_CONTROLER = require("../controlers/userControler");
const router = express.Router();

router.get(
  "/admin/all",
  Validation.validateToken,
  Validation.verifyAdmin,
  USER_CONTROLER.getAllUser
);
router.put(
  "/update",
  Validation.validateToken,
  Validation.verifyUser,
  USER_CONTROLER.updateUserDetails
);

router.delete(
  "/admin/delete/:id",
  Validation.validateToken,
  Validation.verifyAdmin,
  USER_CONTROLER.deleteUser
);
router.put(
  "/admin/block",
  Validation.validateToken,
  Validation.verifyAdmin,
  USER_CONTROLER.blockUser
);
router.put(
  "/admin/verify",
  Validation.validateToken,
  Validation.verifyAdmin,
  USER_CONTROLER.VerifyUser
);
router.delete(
  "/admin/delete-all",
  Validation.validateToken,
  Validation.verifyAdmin,
  USER_CONTROLER.deleteAll
);

// router.get("/get", );
module.exports = router;
