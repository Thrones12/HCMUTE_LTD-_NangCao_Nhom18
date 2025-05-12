let express = require("express");
const upload = require("../middleware/upload"); // middleware multer
let router = express.Router();
let controller = require("../controllers/User");

// GET
router.get("/", controller.GetAll);
router.get("/get-one", controller.GetOne);
// POST
router.post("/login", controller.Login);
router.post("/register", controller.Register);
router.post("/send-otp", controller.SendOTP);
router.post("/send-password", controller.SendPassword);
// PUT
router.put("/activate", controller.Activate);
router.put("/minus-point", controller.MinusPoint);
router.put("/", upload.single("image"), controller.Update);
// DELETE
router.delete("/", controller.GetAll);

module.exports = router;
