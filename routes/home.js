const {Router} = require("express");
const router = Router();
const { ensureAuthenticated } = require('../middlewares/authentication');

router.get("/", ensureAuthenticated, (req, res) => {
    res.render("home")
})


module.exports = router;