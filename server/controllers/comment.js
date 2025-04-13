const Comment = require("../models/comment");
const Lesson = require("../models/lesson");
const User = require("../models/user");

// Get toàn bộ dữ liệu, query
// - userId: get toàn bộ coment trong comments của user
const GetAll = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { userId } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (userId) {
            data = await Comment.find({ user: userId }).populate({
                path: "user",
                model: "User",
            });
        } else {
            data = await Comment.find({}).populate({
                path: "user",
                model: "User",
            });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Comment not found" });

        console.log("Get Comment: \n" + data);
        return res.status(200).json({ data, message: "Get all success" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

const GetOne = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { id, userId } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (id) {
            data = await Comment.findById(id).populate({
                path: "user",
                model: "User",
            });
        } else if (userId) {
            data = await Comment.findOne({ user: userId }).populate({
                path: "user",
                model: "User",
            });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Comment not found" });

        console.log("Get Comment: \n" + data);
        res.json({ data, message: "Get all Comment" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Create, input:  content, userId, lessonId
const Create = async (req, res) => {
    try {
        const { content, userId, lessonId } = req.body;

        const newData = new Comment({ content, user: userId });
        newData.save();

        const lesson = await Lesson.findOne({ _id: lessonId });
        lesson.comments.push(newData._id.toString());
        lesson.save();

        const user = await User.findOne({ _id: userId });

        newData.user = user;

        return res
            .status(200)
            .json({ data: newData, message: "Create thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Update
// _id: quan trọng, dùng để tìm doc update
// input: content
const Update = async (req, res) => {
    try {
        const { _id, content } = req.body;

        const existingData = await Comment.findById(_id);

        if (!existingData)
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });

        if (content) existingData.content = content;

        await existingData.save();

        return res
            .status(200)
            .json({ data: existingData, message: "Update thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Delete, truyền id vào query để xóa, ex: http:192.168.1.3:8080/api/course?id=.....
const Delete = async (req, res) => {
    try {
        const { id } = req.query; // Lấy id từ query string

        const deletedData = await Comment.findByIdAndDelete(id);

        if (!deletedData) {
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });
        }

        return res
            .status(200)
            .json({ data: deletedData, message: "Xóa thành công" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

module.exports = {
    GetAll,
    GetOne,
    Create,
    Update,
    Delete,
};
