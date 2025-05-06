const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" }, // Ref để lấy thông tin exam
    score: { type: Number },
    duration: { type: Number }, // Thời gian làm bài
    answers: [{ type: Boolean }], // Array kết quả dưới dạng true / false
    timestamp: { type: Date, default: Date.now },
});

const ExamResult = mongoose.model("ExamResult", schema);

module.exports = ExamResult;
