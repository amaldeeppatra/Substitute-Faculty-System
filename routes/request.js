const {Router} = require("express");
const router = Router();
const { ensureAuthenticated } = require('../middlewares/authentication');
const Request = require("../models/request");
const { acceptRequest } = require("../controllers/request");

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

router.post("/:id/accept", ensureAuthenticated, acceptRequest);

module.exports = router;