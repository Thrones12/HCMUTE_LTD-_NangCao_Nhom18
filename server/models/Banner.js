const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    pictureUrl: { type: String },
    isActive: { type: Boolean, default: true },
});

const Banner = mongoose.model("Banner", schema);

module.exports = Banner;
