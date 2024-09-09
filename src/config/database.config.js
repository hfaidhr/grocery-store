const mongoose = require("mongoose");
const config = require("./env.config.js");

const connectDB = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI, {});
		console.log("Connected to MongoDB successfully ... 🚀");
	} catch (error) {
		console.error("Failed to connect MongoDB :", error);
		process.exit(1);
	}
};

module.exports = connectDB;
