const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    image: { type: String },
    title: { type: String },
    duration: { type: Number },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Exam = mongoose.model("Exam", schema);

module.exports = Exam;
