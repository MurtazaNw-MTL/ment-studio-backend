const express = require("express");
const router = express.Router();
const PACKAGE_CONTROLER = require("../controlers/package.controler");
const Validation = require("../../../globalMiddleware/Validations");
const PRODUCT_MIDDLEWARE = require("../middleware/product.middleware");
const upload = require("../middleware/multer");

router.post(
  "/create",
  Validation.validateToken,
  Validation.verifyUser,
  PACKAGE_CONTROLER.create
);
router.get("/get", PACKAGE_CONTROLER.get);
router.put(
  "/update/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyPackageUpdation,
  PACKAGE_CONTROLER.update
);
router.put(
  "/update/media/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyPackageUpdation,
  upload.fields([{ name: "image", maxCount: 1 }]),
  PACKAGE_CONTROLER.updateMedia
);
router.delete(
  "/delete/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyPackageUpdation,

  PACKAGE_CONTROLER.delete
);
router.put(
  "/add/feature/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyPackageUpdation,

  PACKAGE_CONTROLER.addFeatures
);

module.exports = router;
