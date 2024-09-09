const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/routes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", routes);
app.use((err, req, res) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

module.exports = app;
