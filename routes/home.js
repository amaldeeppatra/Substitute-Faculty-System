const {Router} = require("express");
const router = Router();
const { ensureAuthenticated } = require('../middlewares/authentication');
const Request = require("../models/request");
const User = require("../models/user");

router.get("/", ensureAuthenticated, async (req, res) => {
    const requests = await Request.find().find({ isAccepted: false }).sort({ createdAt: -1})// Sort by creation date in descending order
    const currentUser = await User.find({email: req.user.email})
    res.render("home", { user: currentUser[0].fullName, requests, requests:requests })
})


module.exports = router;