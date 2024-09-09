require("dotenv").config();

module.exports = {
	PORT: process.env.PORT,
	Node_Env: process.env.NODE_ENV,
	MONGODB_URI: process.env.MONGODB_URI,
};
