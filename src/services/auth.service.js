const JWT = require("jsonwebtoken");
const userService = require("./../services/user.service");
const googleService = require("../plugins/googleauth.plugin");
const enums = require("./enums");

class AuthService {
  AuthResponse(user, token) {
    return {
      uid: user._id,
      fullname: user.fullname,
      email: user.email,
      image: user.image,
      role: user.role,
      verified: user.isVerified,
      roles: user.roles,
      token: token,
    };
  }

  async signup(data) {
    let user = await userService.getByEmail(data.email);

    if (user) {
      user.roles.push(enums.roles.user);
      user = await userService.update(user._id, user);
    } else {
      data.roles = [enums.roles.user];
      user = await userService.create(data);
    }
    const token = JWT.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return this.AuthResponse(user, token);
  }

  // Get google authorization url
  async googleAuthUrl() {
    return googleService.getGoogleAuthURL();
  }

  // Process google callback authentication
  async googleAuthentication(code) {
    // get user details from google
    const googleUser = await googleService.getGoogleUser(code, userType);
    // process requests
    return await this.signup(googleUser);
  }
}

module.exports = new AuthService();
