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
router.put("/like", controller.Like);
router.put("/unlike", controller.Unlike);
router.put("/save", controller.Save);
router.put("/unsave", controller.Unsave);
// DELETE
router.delete("/", controller.Delete);

module.exports = router;
