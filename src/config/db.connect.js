const { Pool } = require("pg");
const config = require("./env.config.js");

const pool = new Pool({
	user: config.DB_USER,
	host: config.DB_HOST,
	database: config.DB_NAME,
	password: config.DB_PASSWORD,
	port: config.DB_PORT || 5432,
});

const connectPostgres = async () => {
	try {
		const client = await pool.connect();
		console.log("Connected to PostgreSQL successfully ... 🚀");
		client.release();
	} catch (error) {
		console.error("Failed to connect to PostgreSQL:", error);
		process.exit(1);
	}
};

module.exports = { connectPostgres, pool };
