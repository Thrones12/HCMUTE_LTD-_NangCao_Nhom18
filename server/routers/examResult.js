let express = require("express");
let router = express.Router();
let controller = require("../controllers/ExamResult");

// GET
router.get("/", controller.GetAll);
router.get("/get-one", controller.GetOne);
// POST
router.post("/", controller.Create);
router.post("/submit", controller.Submit);
// PUT
router.put("/", controller.Update);
// DELETE
router.delete("/", controller.Delete);

module.exports = router;
