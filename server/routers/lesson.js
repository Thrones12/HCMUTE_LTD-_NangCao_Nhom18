let express = require("express");
let router = express.Router();
let controller = require("../controllers/lesson");

router.get("/", controller.GetAll);
router.get("/top", controller.GetTop);
router.get("/getOne", controller.GetOne);

router.post("/", controller.Create);

router.put("/", controller.Update);

router.delete("/", controller.Delete);

module.exports = router;
