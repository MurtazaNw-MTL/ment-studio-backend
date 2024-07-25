const express = require("express");
const AUTH_CONTROLER = require("../controlers/auth.controler");
const Validation = require("../../../globalMiddleware/Validations");
const router = express.Router();

router.post("/register", AUTH_CONTROLER.registerUser);
router.post("/login", AUTH_CONTROLER.login);
router.get(
  "/session-login",
  Validation.validateToken,
  AUTH_CONTROLER.getOneUser
);

// router.get("/get", );
module.exports = router;
