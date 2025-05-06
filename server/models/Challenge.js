const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String }, // Tiêu đề
    tag: { type: String }, // Nhãn, dùng cho search
    groups: [
        {
            title: { type: String },
            questions: [
                { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            ],
        },
    ], // Nhóm các câu hỏi lại và đặt tiêu đề cho chúng
    point: { type: Number, default: 0 }, // Điểm cần để mở khóa
});

const Challenge = mongoose.model("Challenge", schema);

module.exports = Challenge;
