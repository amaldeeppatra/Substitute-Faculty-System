const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const PORT = 5000;

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const userRoute = require("./routes/user")
const homeRoute = require("./routes/home")
const createRoute = require("./routes/create")
const prevRoute = require("./routes/previous")
const acceptedRoute = require("./routes/accepted")
const requestRoute = require("./routes/request")

mongoose.connect("mongodb+srv://admin:2joV202nwh01DHGo@myprojects.hewgpoj.mongodb.net/substitute-faculty-system?retryWrites=true&w=majority&appName=MyProjects").then((e) => console.log("Mongodb connected"))

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("login")
})

app.use("/user", userRoute);
app.use("/home", homeRoute);
app.use("/create", createRoute);
app.use("/previous", prevRoute);
app.use("/accepted", acceptedRoute);
app.use("/request", requestRoute);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));