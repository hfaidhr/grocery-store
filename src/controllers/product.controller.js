const ProductService = require("../services/product.service");

class ProductController {
	async createProduct(req, res) {
		try {
			const product = await ProductService.createProduct(req.body);
			res.status(201).json({
				message: "Product created successfully",
				product,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({
				message: "Error during product creation : " + error.message,
			});
		}
	}

	async updateProduct(req, res) {
		try {
			const productId = req.params.productId;
			const productData = req.body;
			const updatedProduct = await ProductService.updateProduct(
				productId,
				productData
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
		try {
			const productId = req.params.productId;
			const product = await ProductService.getProductById(productId);
			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}
			res.status(200).json({
				message: "Product retrieved successfully",
				product,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({
				message: "Error getting product: " + error.message,
			});
		}
	}

	async deleteProduct(req, res) {
		try {
			const productId = req.params.productId;
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
		try {
			const filters = req.query;
			const products = await ProductService.listProducts(filters);
			res
				.status(200)
				.json({ message: '"Products retrived successfully', products });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "Error listing products: " + error.message,
			});
		}
	}
}

module.exports = new ProductController();
