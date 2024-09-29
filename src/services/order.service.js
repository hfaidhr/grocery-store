const OrderRepository = require("../repositories/order.repository");
const ProductRepository = require("../repositories/product.repository");

class OrderService {
	async createOrder(orderData) {
		let totalPrice = 0;
		const updatedProducts = [];

		for (const item of orderData.products) {
			const product = await ProductRepository.findById(item.product);
			if (!product) {
				throw new Error(`Product with ID ${item.product} not found`);
			}

			if (product.status !== "available") {
				throw new Error(`Product ${product.name} is not available`);
			}

			const productTotalPrice = product.pricePerUnit * item.quantity;
			totalPrice += productTotalPrice;

			updatedProducts.push({
				product: item.product,
				quantity: item.quantity,
				priceAtPurchase: product.pricePerUnit,
			});
		}

		orderData.totalPrice = totalPrice;
		orderData.products = updatedProducts;

		return await OrderRepository.createOrder(orderData);
	}

	async updateOrder(orderId, updateData) {
		const existingOrder = await OrderRepository.findById(orderId);
		if (!existingOrder) {
			throw new Error(`Order with ID ${orderId} not found`);
		}

		if (updateData.products) {
			let totalPrice = 0;
			const updatedProducts = [];

			for (const item of updateData.products) {
				const product = await ProductRepository.findById(item.product);

				if (!product) {
					throw new Error(`Product with ID ${item.product} not found`);
				}

				if (product.status !== "available") {
					throw new Error(`Product ${product.name} is not available`);
				}

				const priceAtPurchase = product.pricePerUnit;

				totalPrice += priceAtPurchase * item.quantity;

				updatedProducts.push({
					product: item.product,
					quantity: item.quantity,
					priceAtPurchase,
				});
			}

			existingOrder.products = updatedProducts;
			existingOrder.totalPrice = totalPrice;
		}

		if (updateData.deliveryAddress) {
			existingOrder.deliveryAddress = updateData.deliveryAddress;
		}

		if (updateData.paymentStatus) {
			existingOrder.paymentStatus = updateData.paymentStatus;
		}

		if (updateData.orderStatus) {
			existingOrder.orderStatus = updateData.orderStatus;
		}

		return await existingOrder.save();
	}

	async getOrdersByUserId(userId, filterOptions) {
		const orders = await OrderRepository.findByUserId(userId, filterOptions);
		if (!orders || orders.length === 0) {
			throw new Error(`No orders found for user with ID ${userId}`);
		}
		return orders;
	}

	async cancelOrder(orderId) {
		const existingOrder = await OrderRepository.findById(orderId);
		if (!existingOrder) {
			throw new Error(`Order with ID ${orderId} not found`);
		}

		const currentTime = new Date();
		const orderTime = new Date(existingOrder.createdAt);

		if (["shipped", "delivered"].includes(existingOrder.orderStatus)) {
			throw new Error(
				`Order with ID ${orderId} cannot be canceled because it is currently ${existingOrder.orderStatus}`
			);
		}

		const timeElapsed = (currentTime - orderTime) / 1000 / 60;
		if (timeElapsed > 30) {
			throw new Error(
				`Order with ID ${orderId} cannot be canceled after 30 minutes of placing the order.`
			);
		}

		existingOrder.orderStatus = "cancelled";
		return await existingOrder.save();
	}
}

module.exports = new OrderService();
