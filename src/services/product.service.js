const ProductRepository = require("../repositories/product.repository");
const {
	uploadImagesToPostgres,
	fetchImagesFromPostgres,
	deleteImagesFromPostgres,
} = require("../utils/image-upload");
const ProductModel = require("../models/product.model");
class ProductService {
	async createProduct(productData, images) {
		let imageIds = [];
		console.log(images);
		try {
			if (images && images.length > 0) {
				imageIds = await uploadImagesToPostgres(images);
			}

			const product = new ProductModel({
				...productData,
				images: imageIds,
			});

			const savedProduct = await product.save();

			const imageData = await fetchImagesFromPostgres(imageIds);

			const productWithImages = {
				...savedProduct.toObject(),
				images: imageData,
			};

			return productWithImages;
		} catch (error) {
			if (imageIds.length > 0) {
				await deleteImagesFromPostgres(imageIds);
			}

			console.error("Error in createProduct:", error);
			throw new Error("Error creating product: " + error.message);
		}
	}

	async updateProduct(productId, productData, images) {
		const existingProduct = await ProductRepository.findById(productId);
		if (!existingProduct) {
			throw new Error("Product not found");
		}

		Object.assign(existingProduct, productData);

		const existingImageIds = existingProduct.images;
		if (existingImageIds.length > 0) {
			await deleteImagesFromPostgres(existingImageIds);
		}

		let imageIds = [];
		if (images && images.length > 0) {
			imageIds = await uploadImagesToPostgres(images);
		}

		existingProduct.images = imageIds;
		await existingProduct.save();

		const imageData = await fetchImagesFromPostgres(imageIds);
		const productWithImages = {
			...existingProduct.toObject(),
			images: imageData,
		};

		return productWithImages;
	}

	async getProductById(productId) {
		try {
			const product = await ProductRepository.findById(productId);
			if (!product) {
				throw new Error("Product not found");
			}

			const imageData = await fetchImagesFromPostgres(product.images);
			const productWithImages = {
				...product.toObject(),
				images: imageData,
			};

			return productWithImages;
		} catch (error) {
			throw new Error("Error getting product: " + error.message);
		}
	}

	async deleteProduct(productId) {
		try {
			// Fetch the existing product to get the image IDs
			const product = await ProductRepository.findById(productId);
			if (!product) {
				throw new Error("Product not found");
			}

			const imageIds = product.images;
			await ProductRepository.deleteProduct(productId);
			if (imageIds && imageIds.length > 0) {
				await deleteImagesFromPostgres(imageIds);
			}

			return product.toObject();
		} catch (error) {
			throw new Error("Error deleting product: " + error.message);
		}
	}

	async listProducts(filters = {}) {
		try {
			const products = await ProductModel.find(filters).lean();
			console.log(products);
			const productsWithImages = await Promise.all(
				products.map(async (product) => {
					const imageData = await fetchImagesFromPostgres(product.images);
					return {
						...product,
						images: imageData,
					};
				})
			);

			return productsWithImages;
		} catch (error) {
			throw new Error("Error listing products: " + error.message);
		}
	}
}

module.exports = new ProductService();
