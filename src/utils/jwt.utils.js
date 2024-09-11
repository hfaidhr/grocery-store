const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");

const generateAccessToken = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
		expiresIn: "15m",
	});
};

const generateRefreshToken = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
		expiresIn: "7d",
	});
};

const verifyToken = (token) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			throw new Error("Token expired");
		}

		if (error.name === "JsonWebTokenError") {
			throw new Error("Invalid token");
		}
		throw new Error("Token verification failed");
	}
};

const authentificateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader?.split(" ")[1];

	if (!token) {
		return res.status(401).send({ mesasge: "No token provided" });
	}

	try {
		const user = verifyToken(token);
		req.user = user;
		next();
	} catch (error) {
		if (error.message === "Token expired") {
			return res.status(401).send({ message: "Token expired" });
		}
		return res.status(403).send({ message: "Invalid token" });
	}
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyToken,
	authentificateToken,
};
