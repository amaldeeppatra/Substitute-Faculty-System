const {Router} = require("express");
const router = Router();
const { ensureAuthenticated } = require('../middlewares/authentication');

router.post("/", ensureAuthenticated, (req, res) => {
    res.clearCookie("token").redirect("/");
})

module.exports = router;