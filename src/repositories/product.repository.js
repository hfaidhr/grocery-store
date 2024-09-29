const Product = require("../models/product.model");

class ProductRepository {
	async create(productData) {
		return await Product.create(productData);
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
		const query = {};
		if (filters.category) query.category = filters.category;
		if (filters.status) query.status = filters.status;
		if (filters.type) query.type = filters.type;

		return await Product.find(query).exec();
	}
}

module.exports = new ProductRepository();
