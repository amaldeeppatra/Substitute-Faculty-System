const {Router} = require("express");
const { showAccepted } = require("../controllers/accepted");
const router = Router();

router.get("/", showAccepted)

module.exports = router;