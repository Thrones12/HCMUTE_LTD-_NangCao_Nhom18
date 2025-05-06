const Comment = require("../models/Comment");
const Lesson = require("../models/Lesson");

// GET /comment
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data = []; // Return data

        // Get data
        let topLevelComments = await Comment.find({
            replyTo: null, // chỉ lấy comment không phải là reply
        });
        // 404 - Not Found
        if (!topLevelComments)
            return res.status(404).json({ message: "Data not found" });
        // Get reply của comment
        for (const comment of topLevelComments) {
            const replies = await Comment.find({ replyTo: comment._id });
            data.push({ ...comment._doc, replies });
        }

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /comment/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Comment.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // Get replies
        const replies = await Comment.find({ replyTo: id });
        data = { ...data._doc, replies };

        console.log(replies);

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /comment
const Create = async (req, res) => {
    try {
        const { lessonId, user, content, replyTo } = req.body;

        // Create
        const data = new Comment({ user, content, replyTo });
        data.save();

        // Thêm comment vào lesson
        const lesson = await Lesson.findById(lessonId);
        lesson.comments.push(data._id.toString());
        lesson.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /comment
const Update = async (req, res) => {
    try {
        const { id, content } = req.body;

        // Get data
        const data = await Comment.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (content) data.content = content;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /comment?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Comment.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xoá comment khỏi comments trong lesson
        const lesson = (await Lesson.find({})).find((lesson) =>
            lesson.comments.some((comment) => comment.toString() === id)
        );
        // 404 - Not Found
        if (!lesson) return res.status(404).json({ message: "Data Not Found" });
        let newData = lesson.comments.filter(
            (comment) => comment.toString() !== id
        );
        lesson.comments = newData;
        await lesson.save();

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
