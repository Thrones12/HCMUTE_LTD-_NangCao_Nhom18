const Lesson = require("../models/lesson");

// Get toàn bộ dữ liệu
const GetAll = async (req, res) => {
    try {
        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        {
            data = await Lesson.find({})
                .populate({
                    path: "likes",
                    model: "User",
                })
                .populate({
                    path: "comments",
                    model: "Comment",
                });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Lesson not found" });

        console.log("Get Lesson: \n" + data);
        return res.status(200).json({ data, message: "Get all thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Get top dữ liệu
const GetTop = async (req, res) => {
    try {
        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        {
            data = await Lesson.find({})
                .sort({ views: -1 }) // sắp xếp giảm dần theo views
                .limit(10) // giới hạn 10 kết quả
                .populate({
                    path: "likes",
                    model: "User",
                })
                .populate({
                    path: "comments",
                    model: "Comment",
                });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Lesson not found" });

        console.log("Get Lesson: \n" + data);
        return res.status(200).json({ data, message: "Get all thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Get dữ liệu bằng query, ex: http:192.168.1.3:8080/api/lesson/getOne?id=.....
const GetOne = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { id } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (id) {
            data = await Lesson.findById(id)
                .populate({
                    path: "likes",
                    model: "User",
                })
                .populate({
                    path: "comments",
                    model: "Comment",
                });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Lesson not found" });

        console.log("Get Lesson: \n" + data);
        return res.status(200).json({ data, message: "Get one thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Create, input: title, videoUrl, document, exercise
const Create = async (req, res) => {
    try {
        const { title, videoUrl, document, exercise } = req.body;

        const newData = new Lesson({
            title,
            videoUrl,
            document,
            exercise,
        });
        newData.save();

        return res
            .status(200)
            .json({ data: newData, message: "Create thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Update
// _id: quan trọng, dùng để tìm doc update
// input: title, videoUrl, document, exercise, views, likes, comments
const Update = async (req, res) => {
    try {
        const {
            _id,
            title,
            videoUrl,
            document,
            exercise,
            views,
            likes,
            comments,
        } = req.body;

        const existingData = await Lesson.findById(_id);

        if (!existingData)
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });

        if (title) existingData.title = title;
        if (videoUrl) existingData.videoUrl = videoUrl;
        if (document) existingData.document = document;
        if (exercise) existingData.exercise = exercise;
        if (views) existingData.views = views;
        if (likes) existingData.likes = [...likes];
        if (comments) existingData.comments = [...comments];

        await existingData.save();

        return res
            .status(200)
            .json({ data: existingData, message: "Update thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Delete, truyền id vào query để xóa, ex: http:192.168.1.3:8080/api/Lesson?id=.....
const Delete = async (req, res) => {
    try {
        const { id } = req.query; // Lấy id từ query string

        const deletedData = await Lesson.findByIdAndDelete(id);

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
    GetTop,
    GetOne,
    Create,
    Update,
    Delete,
};
