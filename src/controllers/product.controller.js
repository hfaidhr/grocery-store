const ProductService = require("../services/product.service");

class ProductController {
	async createProduct(req, res) {
		try {
			if (!req.files || req.files.length === 0) {
				return res.status(400).json({
					message: "At least one product image is required",
				});
			}

			const product = await ProductService.createProduct(req.body, req.files);
			res.status(201).json({
				message: "Product created successfully",
				product,
			});
		} catch (error) {
			console.error("Error in createProduct controller:", error);
			res.status(400).json({
				message: "Error during product creation: " + error.message,
			});
		}
	}

	async updateProduct(req, res) {
		const productId = req.params.productId;
		const productData = req.body;
		const images = req.files;

		try {
			const updatedProduct = await ProductService.updateProduct(
				productId,
				productData,
				images
			);
			res.status(200).json({
				message: "Product updated successfully",
				updatedProduct,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({
				message: "Error during product update: " + error.message,
			});
		}
	}

	async getProductById(req, res) {
		const productId = req.params.productId;

		try {
			const product = await ProductService.getProductById(productId);
			res.status(200).json({
				message: "Product retrieved successfully",
				product,
			});
		} catch (error) {
			console.error(error);
			res.status(404).json({
				message: "Error getting product: " + error.message,
			});
		}
	}

	async deleteProduct(req, res) {
		const productId = req.params.productId;

		try {
			const product = await ProductService.deleteProduct(productId);
			res.status(200).json({
				message: "Product deleted successfully",
				product,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({
				message: "Error deleting product: " + error.message,
			});
		}
	}

	async listProducts(req, res) {
		const filters = req.query;

		try {
			const products = await ProductService.listProducts(filters);
			res.status(200).json({
				message: "Products retrieved successfully",
				products,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "Error listing products: " + error.message,
			});
		}
	}
}

module.exports = new ProductController();
