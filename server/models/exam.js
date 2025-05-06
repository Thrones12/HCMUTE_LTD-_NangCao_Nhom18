const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    tag: { type: String }, // Nhãn, dùng cho search
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, default: 0 }, // Giây
    level: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    attempCount: { type: Number, default: 0 }, // Số lượng user đã hoàn thành exam
    likes: [{ type: String }], // Array string chứa userId
    saves: [{ type: String }], // Array string chứa userId
    timestamp: { type: Date, default: Date.now },
    point: { type: Number, default: 0 }, // Điểm cần để mở khóa
});

const Exam = mongoose.model("Exam", schema);

module.exports = Exam;
