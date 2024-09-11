require("dotenv").config();

module.exports = {
	PORT: process.env.PORT,
	Node_Env: process.env.NODE_ENV,
	MONGODB_URI: process.env.MONGODB_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};
