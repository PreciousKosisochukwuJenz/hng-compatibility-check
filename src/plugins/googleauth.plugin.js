const { google } = require("googleapis");
const axios = require("axios");

// Define Urls
const BaseUrl = "https://https://hng-compatibility-check.herokuapp.com";
const redirectURLs = `${BaseUrl}/auth/google-auth`;

class GoogleAuthentionService {
  googleConnection() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectURLs
    );
  }
  getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    let url = this.googleConnection().generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes, // If you only need one scope you can pass it as string
    });

    return url;
  }

  async getGoogleUser(code) {
    const { tokens } = await this.googleConnection().getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error.message);
      });
    return googleUser;
  }
}

module.exports = new GoogleAuthentionService();
