let express = require("express");
const upload = require("../middleware/upload"); // middleware multer
let router = express.Router();
let controller = require("../controllers/user");

router.get("/", controller.GetAll);
router.get("/getOne", controller.GetOne);
router.get("/get-otp", controller.GetOTP);

router.post("/login", controller.Login);
router.post("/register", controller.Register);
router.post("/set-otp", controller.SetOTP);

router.put("/lock", controller.Lock);
router.put("/unlock", controller.Unlock);
router.put("/regenerate-password", controller.RegeneratePassword);
router.put("/", upload.single("image"), controller.Update);

module.exports = router;
