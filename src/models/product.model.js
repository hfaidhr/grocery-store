const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
			maxlength: [100, "Product name must be less than 100 characters"],
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
			trim: true,
			maxlength: [
				1000,
				"Product description must be less than 1000 characters",
			],
		},
		type: {
			type: String,
			required: [true, "Product type is required"],
			enum: ["liquid", "solid"],
		},
		category: {
			type: String,
			required: [true, "Product category is required"],
			enum: [
				"spices",
				"pastes",
				"baking",
				"grains",
				"canned",
				"liquid",
				"others",
			],
		},
		unitOfMeasurmement: {
			type: String,
			required: [true, "Product unit of measurement is required"],
			enum: ["kg", "g", "l", "ml"],
		},
		pricePerUnit: {
			type: Number,
			required: [true, "Product price per unit is required"],
			min: [0, "Product price per unit must be greater than or equal to 0"],
		},
		status: {
			type: String,
			required: [true, "Product status is required"],
			enum: ["available", "out_of_stock", "discontinued"],
			default: "available",
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Product owner is required"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
