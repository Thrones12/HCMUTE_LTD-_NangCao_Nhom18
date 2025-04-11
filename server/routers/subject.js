let express = require("express");
let router = express.Router();
let controller = require("../controllers/subject");

router.get("/", controller.GetAll);
router.get("/getOne", controller.GetOne);

router.post("/", controller.Create);

router.put("/", controller.Update);

router.delete("/", controller.Delete);

module.exports = router;
