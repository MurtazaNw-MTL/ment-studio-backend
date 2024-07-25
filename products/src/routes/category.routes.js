const express = require("express");
const router = express.Router();
const CATEGORY_CONTROLER = require("../controlers/category.controler");
const Validation = require("../../../globalMiddleware/Validations");

router.post(
  "/create",
  Validation.validateToken,
  Validation.verifyAdmin,
  CATEGORY_CONTROLER.create
);
router.get("/get", CATEGORY_CONTROLER.get);
router.put(
  "/update",
  Validation.validateToken,
  Validation.verifyAdmin,
  CATEGORY_CONTROLER.update
);
router.delete(
  "/delete/:id",
  Validation.validateToken,
  Validation.verifyAdmin,
  CATEGORY_CONTROLER.delete
);
module.exports = router;
