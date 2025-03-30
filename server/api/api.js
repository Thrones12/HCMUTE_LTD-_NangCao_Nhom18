let express = require("express");
let router = express.Router();

let user = require("../routers/user");
router.use("/api/user", user);

module.exports = router;
