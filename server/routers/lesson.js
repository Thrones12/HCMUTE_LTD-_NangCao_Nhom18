let express = require("express");
let router = express.Router();
let controller = require("../controllers/lesson");

router.get("/", controller.GetAll);
router.get("/getOne", controller.GetOne);

router.post("/", controller.Create);

router.put("/", controller.Update);
router.put("/like", controller.Like);
router.put("/unlike", controller.Unlike);

router.delete("/", controller.Delete);

module.exports = router;
