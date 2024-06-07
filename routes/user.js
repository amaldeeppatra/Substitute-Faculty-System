const {Router} = require("express");
const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup")
})


router.post("/signin", (req, res) => {
    res.redirect("/home")
})
router.post("/signup", (req, res) => {
    res.redirect("/")
})


module.exports = router;