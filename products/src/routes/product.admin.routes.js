const express = require("express");
const router = express.Router();
const PRODUCT_ADMIN_CONTROLER = require("../controlers/product.admin.controler");
const Validation = require("../../../globalMiddleware/Validations");
const PRODUCT_MIDDLEWARE = require("../middleware/product.middleware");
const PACKAGE_CONTROLER = require("../controlers/package.controler");

router.put(
  "/verify-product/:id",
  Validation.validateToken,
  Validation.verifyAdmin,
  //   PRODUCT_MIDDLEWARE.VerifyProductUpdation,
  PRODUCT_ADMIN_CONTROLER.adminVerification
);
router.delete(
  "/package/delete-all",
  Validation.validateToken,
  Validation.verifyAdmin,
  PRODUCT_ADMIN_CONTROLER.adminDeleteAllPackages
);

router.delete(
  "/category/delete-all",
  Validation.validateToken,
  Validation.verifyAdmin,
  PRODUCT_ADMIN_CONTROLER.adminDeleteAllCategory
);
router.get(
  "/category/get-all",
  Validation.validateToken,
  Validation.verifyAdmin,
  PRODUCT_ADMIN_CONTROLER.adminGetAllCategory
);
router.get(
  "/package/get-all",
  Validation.validateToken,
  Validation.verifyAdmin,
  PRODUCT_ADMIN_CONTROLER.adminDeleteAllPackages
);

module.exports = router;
