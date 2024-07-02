const {Router} = require("express");
const { createRequest } = require("../controllers/create");
const { ensureAuthenticated } = require("../middlewares/authentication");
const router = Router();
const User = require("../models/user");

router.get("/", ensureAuthenticated, async (req, res) => {
    const currentUser = await User.find({email: req.user.email})
    res.render("create", {user: currentUser[0].fullName})
})

router.post("/", ensureAuthenticated, createRequest);


module.exports = router;