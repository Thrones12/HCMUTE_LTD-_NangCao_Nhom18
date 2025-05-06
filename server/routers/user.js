let express = require("express");
const upload = require("../middleware/upload"); // middleware multer
let router = express.Router();
let controller = require("../controllers/User");

// GET
router.get("/", controller.GetAll);
router.get("/get-one", controller.GetOne);
router.get("/get-otp", controller.GetOTP);
// POST
router.post("/login", controller.Login);
router.post("/register", controller.Register);
router.post("/set-otp", controller.SetOTP);
// PUT
router.put("/lock", controller.Lock);
router.put("/unlock", controller.Unlock);
router.put("/regenerate-password", controller.RegeneratePassword);
router.put("/", upload.single("image"), controller.Update);
// DELETE
router.delete("/", controller.GetAll);

module.exports = router;
