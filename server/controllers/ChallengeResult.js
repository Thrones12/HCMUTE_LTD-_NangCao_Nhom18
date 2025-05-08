const ChallengeResult = require("../models/ChallengeResult");
const User = require("../models/User");

// GET /challenge-result
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await ChallengeResult.find({}).populate({
            path: "challenge",
            model: "Challenge",
        });

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /challenge-result/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await ChallengeResult.findById(id).populate({
            path: "challenge",
            model: "Challenge",
        });

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /challenge-result
const Create = async (req, res) => {
    try {
        const { userId, challenge, progress } = req.body;

        // Create
        const data = new ChallengeResult({ userId, challenge, progress });
        await data.save();

        // Thêm challenge result vào user
        const user = await User.findById(userId);
        user.challengeResults.push(data._id.toString());
        await user.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /challenge-result
const Update = async (req, res) => {
    try {
        const { id, progress } = req.body;

        // Get data
        let data = await ChallengeResult.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // Update
        if (progress) {
            let isDone = progress.every((item) => item === true);
            data.isDone = isDone;
            data.progress = progress;
        }
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /challenge-result?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await ChallengeResult.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xoá result khỏi challengeResults trong User
        const user = (await User.find({})).find((user) =>
            user.challengeResults.some((result) => result.toString() === id)
        );
        // 404 - Not Found
        if (!user) return res.status(404).json({ message: "Data Not Found" });
        let newData = user.challengeResults.filter(
            (result) => result.toString() !== id
        );
        user.challengeResults = newData;
        await user.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
module.exports = {
    GetAll,
    GetOne,
    Create,
    Update,
    Delete,
};
