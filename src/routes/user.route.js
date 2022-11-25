const router = require("express").Router();
const UserCrtl = require("../controllers/user.controller");

router.get("/request-questionaire", UserCrtl.fetchQuestionaire);
router.get("/invite-partner", UserCrtl.invitePartner);

module.exports = router;
