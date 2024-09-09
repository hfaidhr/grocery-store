const User = require("../models/user.model");

class UserRepository {
	async create(user) {
		return await User.create(user);
	}

	async findbyEmail(email) {
		return await User.findOne({ email });
	}

	async findById(userId) {
		return await User.findById(userId);
	}
}

module.exports = new UserRepository();
