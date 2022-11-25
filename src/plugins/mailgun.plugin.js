const mailgunjs = require("mailgun-js");
const CustomError = require("./../utils/custom-error");

class MailgunService {
  constructor(user) {
    this.user = user;
  }

  async send(subject, content, recipient, from) {
    // from = from || `${APP_NAME} <no-reply${mailer.DOMAIN}>`
    from = from || `${APP_NAME} <${process.env.USER}>`;
    content = content || " ";
    let result;

    if (!recipient || recipient.length < 1)
      throw new CustomError("Recipient is required");
    if (!subject) throw new CustomError("Subject is required");

    const mailData = {
      from,
      to: Array.isArray(recipient) ? recipient.join() : recipient,
      subject,
      text: content,
    };

    //Define mailgun api
    const mailgun = mailgunjs({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    result = mailgun.messages().send(mailData);
    if (!result) throw new CustomError("Unable to send mail");

    return result;
  }
}

module.exports = new MailgunService;
