const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
});

const Subject = mongoose.model("Subject", schema);

module.exports = Subject;
