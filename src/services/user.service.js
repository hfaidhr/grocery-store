const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../utils/jwt.utils");
const { client } = require("../config/redisDatabase.config");
class UserService {
	async hashPassword(password) {
		try {
			const salt = await bcrypt.genSalt(10);
			return await bcrypt.hash(password, salt);
		} catch (error) {
			throw new Error(error);
		}
	}

	async createUser(UserData) {
		try {
			const hashedPassword = await this.hashPassword(UserData.password);
			const user = await userRepository.create({
				...UserData,
				password: hashedPassword,
			});
			const userObject = user.toObject();
			delete userObject.password;
			return userObject;
		} catch (error) {
			throw new Error(error);
		}
	}

	async updateUser(userId, userData) {
		try {
			const updatedUser = await userRepository.updateUser(userId, userData);
			if (!updatedUser) {
				throw new Error("User not found");
			}
			const userObject = updatedUser.toObject();
			delete userObject.password;
			return userObject;
		} catch (error) {
			throw new Error("Error updating user: " + error.message);
		}
	}

	async compraPassword(providedPassword, storedPassword) {
		try {
			return await bcrypt.compare(providedPassword, storedPassword);
		} catch (error) {
			throw new Error("Error comparing passwords: " + error.message);
		}
	}

	async authentificateUser(email, password) {
		try {
			const user = await userRepository.findByEmail(email);
			if (!user) {
				throw new Error("User not found");
			}
			const isMatch = await this.compraPassword(password, user.password);
			if (!isMatch) {
				throw new Error("Invalid password");
			}

			const userObject = user.toObject();
			delete userObject.password;

			// Generete tokens
			const accessToken = await generateAccessToken(userObject);
			const refreshToken = await generateRefreshToken(userObject);

			await client.set(`refreshToken:${userObject._id}`, refreshToken, {
				EX: 7 * 24 * 60 * 60,
			});

			return {
				user: userObject,
				accessToken,
				refreshToken,
			};
		} catch (error) {
			throw new Error("Authentification failed: " + error.message);
		}
	}

	async refreshToken(userId, token) {
		try {
			const storedToken = await client.get(`refreshToken:${userId}`);
			if (storedToken && storedToken === token) {
				const newAccessToken = await generateAccessToken({ _id: userId });
				return { newAccessToken };
			} else {
				throw new Error("Invalid refresh token");
			}
		} catch (error) {
			throw new Error("Error validating refresh token : " + error.message);
		}
	}

	async logout(userId) {
		try {
			const result = await client.del(`refreshToken:${userId}`);
			if (result === 1) {
				console.log("User logged out and refresh Token removed ");
			} else {
				throw new Error("User ID not found in Redis");
			}
		} catch (error) {
			throw new Error("Error deleting refresh token: " + error.message);
		}
	}
}

module.exports = new UserService();
