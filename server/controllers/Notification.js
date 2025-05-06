const Activity = require("../models/Activity");
const User = require("../models/User");
const Notification = require("../models/Notification");

// GET /notification
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await Notification.find({});

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
        data = await Notification.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /notification
const Create = async (req, res) => {
    try {
        const { userId, content } = req.body;

        // Create
        const data = new Notification({ content });
        data.save();

        // Thêm notification vào notifications trong user, nếu có userId là thêm thông báo cho 1 user cụ thể
        if (userId) {
            const user = await User.findById(userId);
            user.notifications.push(data._id.toString());
            user.save();
        } else {
            const users = await User.find({});
            for (let user of users) {
                user.notifications.push(data._id.toString());
                user.save();
            }
        }

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /notification
const Update = async (req, res) => {
    try {
        const { id, content, isRead } = req.body;

        // Get data
        const data = await Notification.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (content) data.content = content;
        if (isRead) data.isRead = isRead;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /notification?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Notification.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xóa notification trong user
        const users = await User.find({});
        for (let item of users) {
            let user = await User.findById(item._id);
            user.notifications = user.notifications.filter(
                (noti) => noti.toString() !== id
            );
            await user.save();
        }

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
