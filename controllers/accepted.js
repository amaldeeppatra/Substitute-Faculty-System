const Request = require("../models/request");

async function showAccepted(req, res) {
    const requests = await Request.find({ createdBy: req.user._id }).populate('createdBy', 'fullName')
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    res.render("previous", { user: req.user, requests })
}

module.exports = {showAccepted};