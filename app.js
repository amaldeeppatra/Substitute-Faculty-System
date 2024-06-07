const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const PORT = 5000;

const userRoute = require("./routes/user")
const homeRoute = require("./routes/home")
const createRoute = require("./routes/create")

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("login")
})

app.use("/user", userRoute);
app.use("/home", homeRoute);
app.use("/create", createRoute);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));