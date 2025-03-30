let express = require("express");
let router = express.Router();
let controller = require("../controllers/user");

router.get("/", controller.GetAll);
router.get("/getOne", controller.GetOne);
router.post("/login", controller.Login);
router.post("/register", controller.Register);
router.post("/send-otp", controller.SendOTP);

module.exports = router;
