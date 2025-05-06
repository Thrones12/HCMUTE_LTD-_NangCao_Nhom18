let express = require("express");
let router = express.Router();
let controller = require("../controllers/Exam");

// GET
router.get("/", controller.GetAll);
router.get("/get-one", controller.GetOne);
router.get("/top", controller.GetTop);
// POST
router.post("/", controller.Create);
// PUT
router.put("/", controller.Update);
// DELETE
router.delete("/", controller.Delete);

module.exports = router;
