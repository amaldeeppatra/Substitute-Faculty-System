const {Router} = require("express");
const { userSignin, userSignup } = require("../controllers/user");
const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signin", userSignin);

router.post("/signup", userSignup);


module.exports = router;