const Request = require("../models/request");
const User = require("../models/user");
const sendmail = require("../utils/nodeMailer");
const nodemailer = require('nodemailer');
require('dotenv').config();

async function acceptRequest(req, res){
    const requestId = req.params.id;
    const request = await Request.findById(requestId);

    if (request.createdBy.toString() === req.user._id) {
        return res.status(403).send('You cannot accept your own request.');
    }

    request.isAccepted = true;
    await request.save();

    const user = await User.findById(request.createdBy)
    const currentUser = await User.find({email: req.user.email})
    
    const toCreator = user.email
    const subjectCreator = "Substitute Request Accepted."
    const htmlContentCreator = 
    `
    <p>Dear ${user.fullName}, your substitute request has been accepted by ${currentUser[0].fullName}.</p><br>
    <table style="border: 2px solid black;">
        <thead>
            <td style="border: 2px solid black;
            padding: 5px;">Day</td>
            <td style="border: 2px solid black;
            padding: 5px;">Time</td>
            <td style="border: 2px solid black;
            padding: 5px;">Subject</td>
            <td style="border: 2px solid black;
            padding: 5px;">Section</td>
            <td style="border: 2px solid black;
            padding: 5px;">Room</td>
        </thead>
        <tr>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.day} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.time} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.subject} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.section} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.room} </td>
        </tr>
    </table>
    `
    const toAcceptor = currentUser[0].email
    const subjectAcceptor = "Confirmation For Substitue Request."
    const htmlContentAcceptor = 
    `
    <p>Dear ${currentUser[0].fullName}, you have successfully accepted the substitute request of ${user.fullName}.</p><br>
    <table style="border: 2px solid black;">
        <thead>
            <td style="border: 2px solid black;
            padding: 5px;">Day</td>
            <td style="border: 2px solid black;
            padding: 5px;">Time</td>
            <td style="border: 2px solid black;
            padding: 5px;">Subject</td>
            <td style="border: 2px solid black;
            padding: 5px;">Section</td>
            <td style="border: 2px solid black;
            padding: 5px;">Room</td>
        </thead>
        <tr>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.day} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.time} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.subject} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.section} </td>
            <td style="border: 2px solid black;
            padding: 5px;"> ${request.room} </td>
        </tr>
    </table>
    `
    
    sendmail(toCreator, subjectCreator, htmlContentCreator);
    sendmail(toAcceptor, subjectAcceptor, htmlContentAcceptor);

    res.render("acceptMsg", { requestId: requestId });
}

module.exports = { acceptRequest };