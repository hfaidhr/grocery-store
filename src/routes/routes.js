const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const orderRoutes = require("./order.routes");

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.use("/", userRoutes);
router.use("/", productRoutes);
router.use("/", orderRoutes);

module.exports = router;
