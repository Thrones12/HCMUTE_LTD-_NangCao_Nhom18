const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    question: { type: String }, // Câu hỏi
    options: [{ type: String }], // Phương án, ví dụ A, B, C, D
    answer: { type: String }, // Câu trả lời
    hint: { type: String }, // Gợi ý
    explanation: { type: String }, // Giải thích
    level: {
        type: String,
        enum: ["Easy", "Medium", "Hard", "Extreme"],
        default: "Easy",
    },
});

const Question = mongoose.model("Question", schema);

module.exports = Question;
