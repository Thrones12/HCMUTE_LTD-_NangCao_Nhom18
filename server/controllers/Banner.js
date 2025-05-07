const Banner = require("../models/Banner");

// GET /banner
const GetAll = async (req, res) => {
    try {
        const { isActive } = req.query;
        let data; // Return data

        // Get data
        if (isActive) {
            data = await Banner.find({ isActive: true });
        } else {
            data = await Banner.find({});
        }
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /banner/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Banner.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /banner
const Create = async (req, res) => {
    try {
        const { pictureUrl } = req.body;

        // Create
        const data = new Banner({ pictureUrl });
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /banner
const Update = async (req, res) => {
    try {
        const { id, pictureUrl, isActive } = req.body;

        // Get data
        const data = await Banner.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (pictureUrl) data.pictureUrl = pictureUrl;
        if (isActive) data.isActive = isActive;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /banner?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Banner.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

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
