const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    question: { type: String },
    options: [{ type: String }],
    answer: { type: String },
});

const Question = mongoose.model("Question", schema);

module.exports = Question;
