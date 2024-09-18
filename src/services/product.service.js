const ProductRepository = require("../repositories/product.repository");
class ProductService {
	async createProduct(productData) {
		try {
			const product = await ProductRepository.create(productData);
			return product.toObject();
		} catch (error) {
			throw new Error("Error creating product: " + error.message);
		}
	}

	async updateProduct(productId, productData) {
		try {
			const updatedProduct = await ProductRepository.updateProduct(
				productId,
				productData
			);
			if (!updatedProduct) {
				throw new Error("Product not found");
			}
			return updatedProduct.toObject();
		} catch (error) {
			throw new Error("Error updating product: " + error.message);
		}
	}

	async getProductById(productId) {
		try {
			const product = await ProductRepository.findById(productId);
			if (!product) {
				throw new Error("Product not found");
			}
			return product.toObject();
		} catch (error) {
			throw new Error("Error getting product: " + error.message);
		}
	}

	async deleteProduct(productId) {
		try {
			const product = await ProductRepository.deleteProduct(productId);
			if (!product) {
				throw new Error("Product not found");
			}
			return product.toObject();
		} catch (error) {
			throw new Error("Error deleting product: " + error.message);
		}
	}

	async listProducts(filters = {}) {
		try {
			const products = await ProductRepository.listProducts(filters);
			return products.map((product) => product.toObject());
		} catch (error) {
			throw new Error("Error listing products: " + error.message);
		}
	}
}
module.exports = new ProductService();
