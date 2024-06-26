const Request = require("../models/request");

// async function createRequest(req, res){
//     try{
//         const formData = req.body;
//         // console.log('Received form data:', formData.schedule);          // returns object
//         const len = req.body.schedule.length;
//         formData.forEach(element => {
//             const {day, time, subject, section, room} = req.body.schedule;
//             await Request.create({
//                 day,
//                 time,
//                 subject,
//                 section,
//                 room
//             })
//         });
//         res.json({ message: 'Form submitted successfully!', data: formData, success: true });
//     }
//     catch (error){
//         res.json(error)
//     }
// }


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