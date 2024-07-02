const {Router} = require("express");
const router = Router();
const { ensureAuthenticated } = require('../middlewares/authentication');
const Request = require("../models/request");

router.get("/:id", ensureAuthenticated, async(req, res) => {
    const request = await Request.findById(req.params.id).populate("createdBy");
    res.render("request", {
        day: request.day,
        time: request.time,
        subject: request.subject,
        section: request.section,
        room: request.room,
        createdBy: request.createdBy.fullName,
        requestId: request._id
    })
})

router.post("/:id/accept", ensureAuthenticated, async(req, res) => {
    // const requestId = req.params.id;
    // await Request.findByIdAndUpdate(requestId, { isAccepted: true });
    // res.send(`Request ${requestId} accepted!`);
    const requestId = req.params.id;
    const request = await Request.findById(requestId);

    if (request.createdBy.toString() === req.user._id) {
        return res.status(403).send('You cannot accept your own request.');
    }

    request.isAccepted = true;
    await request.save();

    // res.send(`Request ${requestId} accepted!`);
    res.render("acceptMsg", { requestId: requestId });
})

module.exports = router;