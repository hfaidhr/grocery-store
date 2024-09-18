const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.use("/", userRoutes);
router.use("/", productRoutes);

module.exports = router;
