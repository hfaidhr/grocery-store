const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");

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
}

module.exports = new UserService();
