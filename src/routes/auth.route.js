const router = require("express").Router();
const AuthCtrl = require("../controllers/auth.controller");

router.get("/google-auth-url", AuthCtrl.googleAuthUrl);
router.get("/google-auth", AuthCtrl.GoogleAuthentication);

module.exports = router;
