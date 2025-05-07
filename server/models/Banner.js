const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    pictureUrl: { type: String },
    isActive: { type: Boolean, default: true },
});

const Activity = mongoose.model("Activity", schema);

module.exports = Activity;
