const Request = require("../models/request");

async function createRequest(req, res) {
    try {
        const formData = req.body;

        for (const element of formData.schedule) {
            const { day, time, subject, section, room } = element;
            await Request.create({
                day,
                time,
                subject,
                section,
                room,
                createdBy: req.user._id
            });
        }
        
        res.json({ message: 'Form submitted successfully!', data: formData, success: true });
    } catch (error) {
        res.json({ error: error.message, success: false });
    }
}


module.exports = {createRequest};