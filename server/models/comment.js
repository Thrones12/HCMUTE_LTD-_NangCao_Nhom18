const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    createAt: { type: Date, default: Date.now() },
});

const Comment = mongoose.model("Comment", schema);

module.exports = Comment;
