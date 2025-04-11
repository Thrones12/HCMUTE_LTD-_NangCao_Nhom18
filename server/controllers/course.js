const Course = require("../models/course");

// Get toàn bộ dữ liệu
const GetAll = async (req, res) => {
    try {
        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        {
            data = await Course.find({}).populate({
                path: "subjects",
                model: "Subject",
            });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Course not found" });

        console.log("Get Course: \n" + data);
        return res.status(200).json({ data, message: "Get all thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Get dữ liệu bằng query, ex: http:192.168.1.3:8080/api/course/getOne?id=.....
const GetOne = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { id } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (id) {
            data = await Course.findById(id).populate({
                path: "subjects",
                model: "Subject",
            });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Course not found" });

        console.log("Get Course: \n" + data);
        return res.status(200).json({ data, message: "Get one thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Create, input: title
const Create = async (req, res) => {
    try {
        const { title } = req.body;

        const newData = new Course({ title });
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
// input: title, subjects
const Update = async (req, res) => {
    try {
        const { _id, title, subjects } = req.body;

        const existingData = await Course.findById(_id);

        if (!existingData)
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });

        if (title) existingData.title = title;
        if (subjects) existingData.subjects = [...subjects];

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

        const deletedData = await Course.findByIdAndDelete(id);

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
