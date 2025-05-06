const Activity = require("../models/Activity");
const User = require("../models/User");

// GET /activity
const GetAll = async (req, res) => {
    try {
        const { userId } = req.query;
        let data; // Return data

        // Get data
        if (userId) {
            data = await User.findById(userId).populate({
                path: "histories",
                model: "Activity",
            }).histories;
        } else {
            data = await Activity.find({});
        }

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /activity/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Activity.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /activity
const Create = async (req, res) => {
    try {
        const { userId, action } = req.body;

        // Get User
        const user = await User.findById(userId);
        // 404 - Not Found
        if (!user) return res.status(404).json({ message: "Data Not Found" });

        // Create
        const data = new Activity({ action });
        await data.save();

        // Thêm activity vào histories của User
        user.histories.push(data._id.toString());
        user.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /activity
const Update = async (req, res) => {
    try {
        const { id, action } = req.body;

        // Get data
        const data = await Activity.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (action) data.action = action;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /activity?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Activity.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xoá activity khỏi histories trong User
        const user = (await User.find({})).find((user) =>
            user.histories.some((activity) => activity.toString() === id)
        );
        // 404 - Not Found
        if (!user) return res.status(404).json({ message: "Data Not Found" });
        let newData = user.histories.filter(
            (activity) => activity.toString() !== id
        );
        user.histories = newData;
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
