const MatchServ = require("../services/match.service");
const response = require("../utils/response");

class AuthContoller {
  async fetchQuestionaire(req, res) {
    const result = await MatchServ.fetchQuestions();
    res.status(201).send(response("Fetch Successful", result));
  }

  async invitePartner(req, res) {
    const result = await MatchServ.invitePartner(req);
    res.status(200).send(response("Partner inviation sent succefully", result));
  }
}

module.exports = new AuthContoller();
