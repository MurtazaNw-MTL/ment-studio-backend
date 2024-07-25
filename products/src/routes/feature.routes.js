const express = require("express");
const router = express.Router();
const Feature_Controler = require("../controlers/features.controler");
const Validation = require("../../../globalMiddleware/Validations");

router.post(
  "/create",
  Validation.validateToken,
  Validation.verifyUser,
  Feature_Controler.create
);
router.get("/get", Feature_Controler.get);
router.put(
  "/update",
  Validation.validateToken,
  Validation.verifyUser,
  Feature_Controler.update
);
router.delete(
  "/delete/:id",
  Validation.validateToken,
  Validation.verifyUser,
  Feature_Controler.delete
);
module.exports = router;
