const {Router} = require("express");
const { createRequest } = require("../controllers/create");
const router = Router();

router.get("/", (req, res) => {
    res.render("create")
})

router.post("/", createRequest);


module.exports = router;