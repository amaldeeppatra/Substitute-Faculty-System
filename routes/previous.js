const {Router} = require("express");
const { showRequests } = require("../controllers/previous");
const Request = require("../models/request");
const { ensureAuthenticated } = require("../middlewares/authentication");
const router = Router();

router.get("/", ensureAuthenticated, async (req, res) => {
    // const requests = await Request.find({ createdBy: req.user._id }).populate('createdBy', 'fullName');
    const requests = await Request.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    .populate('createdBy', 'fullName');
    res.render("previous", { user: req.user, requests })
});

module.exports = router;