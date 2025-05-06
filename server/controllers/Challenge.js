const Challenge = require("../models/Challenge");
const ChallengeResult = require("../models/ChallengeResult");
const { GenerateTag } = require("../utils/Generator");
// GET /challenge
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await Challenge.find({});

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /challenge/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Challenge.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /challenge
const Create = async (req, res) => {
    try {
        const { title, groups } = req.body;

        // Create
        let tag = GenerateTag(title);
        const data = new Challenge({ title, tag, groups });
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /challenge
const Update = async (req, res) => {
    try {
        const { id, title, groups, point } = req.body;

        // Get data
        let data = await Challenge.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // Update
        if (title) {
            data.title = title;
            let tag = GenerateTag(title);
            data.tag = tag;
        }
        if (groups) data.groups = [...groups];
        if (point) data.point = point;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /challenge?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Challenge.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xóa Challenge Result
        await ChallengeResult.deleteMany({ challenge: id });

        // Xóa result trong Challenge Result của User

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
