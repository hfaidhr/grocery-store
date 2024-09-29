const Order = require("../models/order.model");

class OrderRepository {
	async createOrder(orderData) {
		const order = new Order(orderData);
		return await order.save();
	}

	async findByUserId(userId, filterOptions = {}) {
		const { orderStatus, paymentStatus } = filterOptions;
		const query = { user: userId };

		if (orderStatus) {
			query.orderStatus = orderStatus;
		}
		if (paymentStatus) {
			query.paymentStatus = paymentStatus;
		}

		return await Order.find(query)
			.populate("user")
			.populate("products.product");
	}

	async findById(orderId) {
		return await Order.findById(orderId)
			.populate("user")
			.populate("products.product");
	}

	async updateOrder(orderId, updateData) {
		return await Order.findByIdAndUpdate(orderId, updateData, {
			new: true,
			runValidators: true,
		})
			.populate("user")
			.populate("products.product");
	}

	async cancelOrder(orderId) {
		return await Order.findByIdAndUpdate(
			orderId,
			{ orderStatus: "cancelled" },
			{ new: true, runValidators: true }
		);
	}
}

module.exports = new OrderRepository();
