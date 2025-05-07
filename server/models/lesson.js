const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    courseTitle: { type: String }, // Thông tin phụ
    subjectTitle: { type: String }, // Thông tin phụ
    tag: { type: String }, // Nhãn, dùng cho search
    videoUrl: { type: String }, // đường dẫn đến video
    chapters: [{ time: { type: Number }, title: { type: String } }],
    attempCount: { type: Number, default: 0 },
    document: { type: String }, // Tài liệu lý thuyết
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Bài tập
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Bình luận
});

const Lesson = mongoose.model("Lesson", schema);

module.exports = Lesson;
