const User = require("../models/user");

async function userSignup(req, res){
    try{
        const {fullName, facultyID, email, password} = req.body;
        await User.create({
            fullName,
            facultyID,
            email,
            password,
        })
        res.redirect("/home");
    }
    catch (error){
        // res.json(error)
        res.redirect("/user/signup");
    }
}

async function userSignin(req, res){
    try{
        const {email, password} = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        // console.log(token)
        return res.cookie("token", token).redirect("/home");
    }
    catch (error){
        res.redirect("/");
    }
}

module.exports = {
    userSignup,
    userSignin,
}