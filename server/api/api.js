let express = require("express");
let router = express.Router();

let activity = require("../routers/activity");
router.use("/api/activity", activity);

let comment = require("../routers/comment");
router.use("/api/comment", comment);

let course = require("../routers/course");
router.use("/api/course", course);

let exam = require("../routers/exam");
router.use("/api/exam", exam);

let examResult = require("../routers/examResult");
router.use("/api/examResult", examResult);

let lesson = require("../routers/lesson");
router.use("/api/lesson", lesson);

let question = require("../routers/question");
router.use("/api/question", question);

let subject = require("../routers/subject");
router.use("/api/subject", subject);

let user = require("../routers/user");
router.use("/api/user", user);

module.exports = router;
