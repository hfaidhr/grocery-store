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
}

module.exports = new UserController();
