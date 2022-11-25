const mailgunService = require("../plugins/mailgun.plugin");
const InvitationModel = require("../models/invitation.model");
const questionbankJson = require("../store/question-bank.json");
class Matcher {
  async invitePartner(request) {
    const { $user: user, body } = request;

    const invitationModel = new InvitationModel({
      user: user._id,
      email: body.email,
    });

    const invitation = invitationModel.save();

    const subject = "HNG compatibality checker invitation";
    const content = `Hey, you have been invited for a compatibility check by ${this.user.fullname}`;
    const recipient = body.email;

    await mailgunService.send(subject, content, recipient);
    return invitation;
  }

  async fetchQuestions() {
    return JSON.parse(JSON.stringify(questionbankJson));
  }
}

module.exports = new Matcher();
