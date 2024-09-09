const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.use("/", userRoutes);

module.exports = router;
