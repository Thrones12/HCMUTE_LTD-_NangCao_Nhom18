const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    type: { type: String, enum: ["comment", "like", "exam"] },
    message: { type: String },
});

const Activity = mongoose.model("Activity", schema);

module.exports = Activity;
