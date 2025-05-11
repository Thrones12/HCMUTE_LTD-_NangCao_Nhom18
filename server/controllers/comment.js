const Comment = require("../models/Comment");
const Lesson = require("../models/Lesson");

// GET /comment
const GetAll = async (req, res) => {
    try {
        const { lessonId } = req.query;
        let data = []; // Return data

        // Get data
        let topLevelComments;
        if (lessonId) {
            let lesson = await Lesson.findById(lessonId).populate({
                path: "comments",
                model: "Comment",
                populate: { path: "user", model: "User" },
            });
            topLevelComments = lesson.comments.filter(
                (comment) => comment.replyTo === null
            );
        } else {
            topLevelComments = await Comment.find({
                replyTo: null,
            });
        }
        // 404 - Not Found
        if (!topLevelComments)
            return res.status(404).json({ message: "Data not found" });
        // Get reply của comment
        for (const comment of topLevelComments) {
            const replies = await Comment.find({
                replyTo: comment._id,
            }).populate({ path: "user", model: "User" });
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
        console.log(lessonId, user, content, replyTo);

        // Create
        let data = new Comment({
            user,
            content,
            replyTo,
        });
        await data.save();

        // Thêm comment vào lesson
        const lesson = await Lesson.findById(lessonId);
        lesson.comments.push(data._id.toString());
        await lesson.save();

        let returnData = await Comment.findById(data._id).populate({
            path: "user",
            model: "User",
        });

        // 200 - Success
        return res.status(200).json({ data: returnData });
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
// PUT /comment/like
const Like = async (req, res) => {
    try {
        const { commentId, userId } = req.body;

        // Get data
        const data = await Comment.findById(commentId);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Like
        data.likes.push(userId);
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /comment/unlike
const Unlike = async (req, res) => {
    try {
        const { commentId, userId } = req.body;

        // Get data
        const data = await Comment.findById(commentId);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Like
        let likes = data.likes.filter((like) => like.toString() !== userId);
        data.likes = [...likes];
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
    Like,
    Unlike,
    Delete,
};
