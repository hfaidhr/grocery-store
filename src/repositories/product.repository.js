const Product = require("../models/product.model");
class ProductRepository {
	async create(product) {
		return await Product.create(product);
	}

	async findById(productId) {
		return await Product.findById(productId);
	}

	async updateProduct(productId, productData) {
		return await Product.findByIdAndUpdate(productId, productData, {
			new: true,
			runValidators: true,
		});
	}
	async deleteProduct(productId) {
		return await Product.findByIdAndDelete(productId);
	}

	async listProducts(filters = {}) {
		try {
			const querry = {};

			if (filters.category) {
				querry.category = filters.category;
			}

			if (filters.status) {
				querry.status = filters.status;
			}
			if (filters.type) {
				querry.type = filters.type;
			}
			const products = await Product.find(querry).exec();
			return products;
		} catch (error) {
			throw new Error("Error listing products: " + error.message);
		}
	}
}
module.exports = new ProductRepository();
