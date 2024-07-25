const express = require("express");
const router = express.Router();
const PRODUCT_CONTROLER = require("../controlers/product.controler");
const Validation = require("../../../globalMiddleware/Validations");
const PRODUCT_MIDDLEWARE = require("../middleware/product.middleware");
const upload = require("../middleware/multer");

router.post("/create", Validation.validateToken, PRODUCT_CONTROLER.create);
router.get("/get", Validation.validateToken, PRODUCT_CONTROLER.get);
router.get(
  "/get-admin",
  Validation.validateToken,
  Validation.verifyAdmin,
  PRODUCT_CONTROLER.getAll
);
router.delete(
  "/delete-all",
  Validation.validateToken,
  PRODUCT_CONTROLER.deleteAll
);
router.put(
  "/update/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyProductUpdation,
  PRODUCT_CONTROLER.update
);
router.put(
  "/update/media/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyProductUpdation,
  upload.fields([{ name: "image", maxCount: 1 }]),
  PRODUCT_CONTROLER.updateMedia
);
router.put(
  "/update/feature/:id",
  Validation.validateToken,
  Validation.verifyUser,
  PRODUCT_MIDDLEWARE.VerifyProductUpdation,
  PRODUCT_CONTROLER.addFeature
);

module.exports = router;
