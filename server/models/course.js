const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

const Course = mongoose.model("Course", schema);

module.exports = Course;
