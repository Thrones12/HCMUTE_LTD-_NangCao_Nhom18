const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    content: { type: String }, // Nội dung thông báo
    isRead: { type: String, default: false }, // Người dùng đã / chưa đọc
    timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", schema);

module.exports = Notification;
