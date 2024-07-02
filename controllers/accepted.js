const Request = require("../models/request");
const User = require("../models/user");

async function showAccepted(req, res) {``
    const requests = await Request.find({ createdBy: req.user._id, isAccepted: true }).populate('createdBy', 'fullName')
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    const currentUser = await User.find({email: req.user.email})

    res.render("accepted", { user: currentUser[0].fullName , requests })
}

module.exports = {showAccepted};