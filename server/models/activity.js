const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    action: { type: String }, // tên hành động
    timestamp: { type: Date, default: Date.now }, // Ngày thực hiện
});

const Activity = mongoose.model("Activity", schema);

module.exports = Activity;
