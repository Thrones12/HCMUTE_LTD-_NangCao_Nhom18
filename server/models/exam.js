const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    duration: { type: Number },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }],
});

const Exam = mongoose.model("Exam", schema);

module.exports = Exam;
