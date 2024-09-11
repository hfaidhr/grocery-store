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

	async updateUser(userId, userData) {
		return await User.findByIdAndUpdate(userId, userData, {
			new: true,
			runValidators: true,
		});
	}

	async findByEmail(email) {
		return await User.findOne({ email });
	}
}

module.exports = new UserRepository();
