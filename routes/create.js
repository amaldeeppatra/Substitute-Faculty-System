const {Router} = require("express");
const { createRequest } = require("../controllers/create");
const { ensureAuthenticated } = require("../middlewares/authentication");
const router = Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.render("create")
})

router.post("/", ensureAuthenticated, createRequest);


module.exports = router;