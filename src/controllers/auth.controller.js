const AuthServ = require("../services/auth.service");
const response = require("../utils/response");

class AuthContoller {
  async signup(req, res) {
    const result = await AuthServ.signup(req.body);
    res.status(201).send(response("User Auth Successful", result));
  }

  async googleAuthUrl(req, res) {
    const result = await AuthServ.googleAuthUrl();
    res.status(200).send(response("Google authorization url", result));
  }

  async GoogleAuthentication(req, res) {
    let code = req.query.code;

    const result = await AuthServ.googleAuthentication(code);
    res.status(200).send(response("Sign in successful", result));
  }
}

module.exports = new AuthContoller();
