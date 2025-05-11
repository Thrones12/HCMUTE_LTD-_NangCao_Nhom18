const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    avatar: { type: String },
    fullname: { type: String },
    phone: { type: String },
    address: { type: String },
    role: { type: String, enum: ["Student", "Admin"], default: "Student" },
    status: {
        type: String,
        enum: ["Active", "NotVerify", "Locked"],
        default: "NotVerify",
    },
    histories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }], // Lịch sử hoạt động
    learned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], // Lesson đã hoàn thành
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }], // Exam lưu trữ
    examResults: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExamResult" }],
    notifications: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],
});

const User = mongoose.model("User", schema);

module.exports = User;
