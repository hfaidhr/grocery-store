const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: [true, "Product is required"],
				},
				quantity: {
					type: Number,
					required: [true, "Product quantity is required"],
					min: [1, "Quantity must be at least 1"],
				},
				priceAtPurchase: {
					type: Number,
					required: [true, "Product price at time of purchase is required"],
					min: [0, "Price must be greater than or equal to 0"],
				},
			},
		],
		totalPrice: {
			type: Number,
			required: [true, "Total price is required"],
			min: [0, "Total price must be greater than or equal to 0"],
		},
		paymentMethod: {
			type: String,
			required: [true, "Payment method is required"],
			enum: ["cash_on_delivery", "credit_card"],
		},
		paymentStatus: {
			type: String,
			required: [true, "Payment status is required"],
			enum: ["pending", "paid", "failed"],
			default: "pending",
		},
		orderStatus: {
			type: String,
			required: [true, "Order status is required"],
			enum: ["processing", "shipped", "delivered", "cancelled"],
			default: "processing",
		},
		deliveryAddress: {
			street: { type: String, required: [true, "Street is required"] },
			city: { type: String, required: [true, "City is required"] },
			country: { type: String, required: [true, "Country is required"] },
			postalCode: { type: String, required: [true, "Postal code is required"] },
		},
		deliveryDate: {
			type: Date,
		},
		transactionId: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
