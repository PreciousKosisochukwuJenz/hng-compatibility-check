const User = require("../models/user.model");
const CustomError = require("../utils/custom-error");

class UserService {
  async create(data) {
    let user = new User(data);
    let response = await user.save();
    return user;
  }

  async getAll() {
    return await User.find({}, { password: 0, __v: 0 });
  }

  async getOne(userId) {
    const user = await User.findOne({ _id: userId }, { password: 0, __v: 0 });
    if (!user) throw new CustomError("User does not exist");

    return user;
  }

  async getByEmail(email) {
    const user = await User.findOne({
      email,
      email,
    });
    return user;
  }

  async update(userId, req) {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: req },
      { new: true }
    );

    if (!user) throw new CustomError("User dosen't exist", 404);

    return user;
  }

  async delete(userId) {
    const user = await User.findOne({ _id: userId });
    user.remove();
    return user;
  }
}

module.exports = new UserService();
