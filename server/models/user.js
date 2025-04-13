const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    avatar: { type: String },
    fullname: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: String, enum: ["active", "locked"], default: "locked" },
    otp: { type: String },
    histories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    storage: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExamResult" }],
});

const User = mongoose.model("User", schema);

module.exports = User;
