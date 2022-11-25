const mailgunService = require("../plugins/mailgun.plugin");
const InivationModel = require("../models/invitation.model");
class Match {
  async invitePartner(request) {
    const { user: $user, body } = request;

    const inivation = new InivationModel({
      user: user._id,
      email: body.email,
    });

    const response = inivation.save();

    const subject = "HNG compatibality checker invitation";
    const content = `Hey, you have been invited for a compatibility check by ${this.user.fullname}`;
    const recipient = body.email;

    return await mailgunService.send(subject, content, recipient);
  }
}

module.exports = new Match();
