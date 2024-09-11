const { createClient } = require("redis");
const config = require("./env.config.js");

const client = createClient({
	password: config.REDIS_PASSWORD,
	socket: {
		host: config.REDIS_HOST,
		port: config.REDIS_PORT,
	},
});

const connectRedis = async () => {
	try {
		client.on("error", (error) => {
			console.log("Redis connection error: ", error);
			process.exit(1);
		});

		await client.connect();
		console.log("Connected to Redis successfully ... 🚀");
	} catch (error) {
		console.error("Failed to connect Redis :", error);
		process.exit(1);
	}
};

module.exports = { connectRedis, client };
