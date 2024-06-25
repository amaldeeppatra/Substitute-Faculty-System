const {createHmac, randomBytes} = require("crypto");
const { Schema, model } = require("mongoose");
const {createTokenForUser} = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    facultyID: {
        type: String,
        required: true,
        unique: true,
        index: true,
        sparse: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        sparse: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
}, {timestamps: true});


userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});


userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
})

const User = model("user", userSchema);

module.exports = User;