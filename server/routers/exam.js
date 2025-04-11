let express = require("express");
let router = express.Router();
let controller = require("../controllers/exam");

router.get("/", controller.GetAll);
router.get("/getOne", controller.GetOne);
router.get("/top", controller.GetTop);

router.post("/", controller.Create);

router.put("/", controller.Update);

router.delete("/", controller.Delete);

module.exports = router;
