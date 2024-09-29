const app = require("./src/index");
const config = require("./src/config/env.config");
const connectDB = require("./src/config/database.config");
const { connectRedis } = require("./src/config/redisDatabase.config");
const { connectPostgres } = require("./src/config/db.connect");

const startServer = async () => {
	try {
		await connectDB();
		await connectPostgres();
		await connectRedis();

		const server = app.listen(config.PORT, () => {
			console.log(
				`Server is running in ${config.Node_Env} mode on port ${config.PORT}`
			);
		});
	} catch (error) {
		console.error("Failed to start the server: ", error);
		process.exit(1);
	}
};

startServer();
