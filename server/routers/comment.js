let express = require("express");
let router = express.Router();
let controller = require("../controllers/Comment");

// GET
router.get("/", controller.GetAll);
router.get("/get-one", controller.GetOne);
// POST
router.post("/", controller.Create);
// PUT
router.put("/", controller.Update);
router.put("/like", controller.Like);
router.put("/unlike", controller.Unlike);
// DELETE
router.delete("/", controller.Delete);

module.exports = router;
