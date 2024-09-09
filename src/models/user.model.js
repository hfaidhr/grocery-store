const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
			mawlength: [50, "First name must be less than 50 characters"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
			maxlength: [50, "Last name must be less than 50 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			unique: true,
			match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			trim: true,
			minlength: [8, "Password must be at least 8 characters"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
