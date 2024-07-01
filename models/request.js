const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


const Request = model("request", requestSchema);

module.exports = Request;