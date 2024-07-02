const Request = require("../models/request");
const User = require("../models/user");

async function showPrevious(req, res) {
    const requests = await Request.find({ createdBy: req.user._id, isAccepted: false }).populate('createdBy', 'fullName')
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    const currentUser = await User.find({email: req.user.email})
    res.render("previous", { user: currentUser[0].fullName, requests })
}

module.exports = {showPrevious};