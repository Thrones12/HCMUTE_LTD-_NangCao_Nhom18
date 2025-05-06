let express = require("express");
let router = express.Router();

// Activity
let Activity = require("../routers/Activity");
router.use("/api/activity", Activity);
// Challenge
let Challenge = require("../routers/Challenge");
router.use("/api/challenge", Challenge);
// ChallengeResult
let ChallengeResult = require("../routers/ChallengeResult");
router.use("/api/challenge-result", ChallengeResult);
// Comment
let Comment = require("../routers/Comment");
router.use("/api/comment", Comment);
// Course
let Course = require("../routers/Course");
router.use("/api/course", Course);
// Exam
let Exam = require("../routers/Exam");
router.use("/api/exam", Exam);
// ExamResult
let ExamResult = require("../routers/ExamResult");
router.use("/api/exam-result", ExamResult);
// Lesson
let Lesson = require("../routers/Lesson");
router.use("/api/lesson", Lesson);
// Notification
let Notification = require("../routers/Notification");
router.use("/api/notification", Notification);
// Question
let Question = require("../routers/Question");
router.use("/api/question", Question);
// Subject
let Subject = require("../routers/Subject");
router.use("/api/subject", Subject);
// User
let User = require("../routers/User");
router.use("/api/user", User);

module.exports = router;
