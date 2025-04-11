const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    videoUrl: { type: String },
    document: { type: String },
    exercise: { type: String },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Lesson = mongoose.model("Lesson", schema);

module.exports = Lesson;
