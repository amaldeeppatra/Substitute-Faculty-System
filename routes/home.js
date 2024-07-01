const {Router} = require("express");
const router = Router();
const { ensureAuthenticated } = require('../middlewares/authentication');
const Request = require("../models/request");

router.get("/", ensureAuthenticated, async (req, res) => {
    const requests = await Request.find().sort({ createdAt: -1 }) // Sort by creation date in descending order
    res.render("home", { requests, requests:requests })
})


module.exports = router;