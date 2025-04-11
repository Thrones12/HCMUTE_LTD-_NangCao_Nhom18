const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    views: { type: Number, default: 0 },
});

const Subject = mongoose.model("Subject", schema);

module.exports = Subject;
