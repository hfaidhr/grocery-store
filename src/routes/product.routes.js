const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.post("/product", ProductController.createProduct);
router.get("/product", ProductController.listProducts);
router.get("/product/:productId", ProductController.getProductById);
router.patch("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.deleteProduct);

module.exports = router;
