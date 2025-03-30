const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: String, enum: ["active", "locked"], default: "locked" },
    otp: { type: String },
});

const User = mongoose.model("User", schema);

module.exports = User;
