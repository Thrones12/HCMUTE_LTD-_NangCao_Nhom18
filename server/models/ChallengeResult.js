const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: { type: String },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    isDone: { type: Boolean, default: false }, // Đã / chưa xong thử thách
    progress: [{ type: Boolean, default: false }], // Array các question dưới dạng true / false
    timestamp: { type: Date, default: Date.now },
});

const ChallengeResult = mongoose.model("ChallengeResult", schema);

module.exports = ChallengeResult;
