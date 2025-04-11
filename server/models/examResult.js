const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    score: { type: Number },
    answers: [
        {
            questionId: { type: String },
            answer: { type: String },
            result: { type: Boolean },
        },
    ],
    submitAt: { type: Date, default: Date.now },
});

const ExamResult = mongoose.model("ExamResult", schema);

module.exports = ExamResult;
