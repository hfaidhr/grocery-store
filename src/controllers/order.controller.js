const OrderService = require("../services/order.service");

class OrderController {
	async createOrder(req, res) {
		try {
			const { user, products, paymentMethod, deliveryAddress } = req.body;

			if (!user || !products || !deliveryAddress) {
				return res.status(400).json({
					message: "User ID, products, and delivery address are required",
				});
			}

			const orderData = {
				user,
				products,
				paymentMethod,
				deliveryAddress,
			};

			const newOrder = await OrderService.createOrder(orderData);
			return res.status(201).json(newOrder);
		} catch (error) {
			console.error("Error creating order:", error);
			return res.status(500).json({ message: error.message });
		}
	}

	async updateOrder(req, res) {
		try {
			const orderId = req.params.orderId;
			const updateData = req.body;
			const updatedOrder = await OrderService.updateOrder(orderId, updateData);

			return res.status(200).json({
				message: "Order updated successfully",
				order: updatedOrder,
			});
		} catch (error) {
			return res.status(400).json({
				message: error.message || "Failed to update order",
			});
		}
	}

	async getOrdersByUserId(req, res) {
		const userId = req.params.userId;
		const { orderStatus, paymentStatus } = req.query;

		try {
			const filterOptions = {
				orderStatus: orderStatus || undefined,
				paymentStatus: paymentStatus || undefined,
			};
			const orders = await OrderService.getOrdersByUserId(
				userId,
				filterOptions
			);
			return res.status(200).json({
				message: "Orders retrieved successfully",
				orders,
			});
		} catch (error) {
			return res.status(404).json({
				message: error.message,
			});
		}
	}

	async cancelOrder(req, res) {
		const { orderId } = req.params;

		try {
			const canceledOrder = await OrderService.cancelOrder(orderId);
			return res.status(200).json({
				message: "Order canceled successfully",
				order: canceledOrder,
			});
		} catch (error) {
			return res.status(400).json({
				message: error.message,
			});
		}
	}
}

module.exports = new OrderController();
