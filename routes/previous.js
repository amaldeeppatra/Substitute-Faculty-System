const {Router} = require("express");
const { showRequests, showPrevious } = require("../controllers/previous");
// const Request = require("../models/request");
const { ensureAuthenticated } = require("../middlewares/authentication");
const router = Router();

router.get("/", ensureAuthenticated, showPrevious);

module.exports = router;