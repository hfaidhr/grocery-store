const UserService = require("../services/user.service");

class UserController {
	async createUser(req, res) {
		try {
			const user = await UserService.createUser(req.body);
			res.status(201).json({
				message: "User created successfully",
				user,
			});
		} catch (error) {
			res.status(400).send(error.message);
		}
	}

	async updateUser(req, res) {
		try {
			const userId = req.params.userId;
			const updateData = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
			};
			const updatedUser = await UserService.updateUser(userId, updateData);
			res.status(200).json({
				message: "User updated successfully",
				updatedUser,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({ message: error.message });
		}
	}

	async loginUser(req, res) {
		try {
			const { email, password } = req.body;
			const { user, accessToken, refreshToken } =
				await UserService.authentificateUser(email, password);

			res.status(200).json({
				message: "User authenticated successfully",
				user,
				accessToken,
				refreshToken,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "Error during login",
			});
		}
	}

	async refreshToken(req, res) {
		try {
			const { userId, refreshToken } = req.body;
			if (!userId || !refreshToken) {
				return res.status(400).json({
					message: "User ID and refresh token are required",
				});
			}
			const { newAccessToken } = await UserService.refreshToken(
				userId,
				refreshToken
			);

			res.status(200).json({
				message: "Token refreshed successfully",
				accessToken: newAccessToken,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({
				message: error.message,
			});
		}
	}

	async logout(req, res) {
		try {
			const userId = req.params.userId;
			if (!userId) {
				return res.status(400).json({
					message: "User ID is required",
				});
			}
			await UserService.logout(userId);
			res.status(200).json({
				message: "User logged out successfully",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: error.message,
			});
		}
	}
}

module.exports = new UserController();
