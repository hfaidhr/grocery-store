const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { pool } = require("../config/db.connect");

router.post(
	"/product",
	upload.array("images"),
	ProductController.createProduct
);
router.get("/product", ProductController.listProducts);
router.get("/product/:productId", ProductController.getProductById);

router.patch(
	"/product/:productId",
	upload.array("images"),
	ProductController.updateProduct
);

router.delete("/product/:productId", ProductController.deleteProduct);

router.get("/image/:imageId", async (req, res) => {
	const imageId = req.params.imageId;

	try {
		const result = await pool.query(
			"SELECT images FROM product_images WHERE id = $1",
			[imageId]
		);

		if (result.rows.length > 0) {
			const imageBuffer = result.rows[0].images;
			res.writeHead(200, {
				"Content-Type": "image/jpeg",
				"Content-Length": imageBuffer.length,
			});
			res.end(imageBuffer);
		} else {
			res.status(404).json({ message: "Image not found" });
		}
	} catch (error) {
		console.error("Error fetching image:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
