let express = require("express");
let router = express.Router();
let controller = require("../controllers/Lesson");

// GET
router.get("/", controller.GetAll);
router.get("/get-top", controller.GetTop);
router.get("/get-one", controller.GetOne);
// POST
router.post("/rating", controller.Rating);
router.post("/", controller.Create);
// PUT
router.put("/", controller.Update);
// DELETE
router.delete("/", controller.Delete);

module.exports = router;
