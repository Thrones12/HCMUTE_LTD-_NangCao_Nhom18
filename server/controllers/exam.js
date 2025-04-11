const Exam = require("../models/exam");

// Get toàn bộ dữ liệu
const GetAll = async (req, res) => {
    try {
        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        {
            data = await Exam.find({})
                .populate({
                    path: "questions",
                    model: "Question",
                })
                .populate({
                    path: "likes",
                    model: "User",
                })
                .populate({
                    path: "save",
                    model: "User",
                });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Exam not found" });

        console.log("Get Exam: \n" + data);
        return res.status(200).json({ data, message: "Get all thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Get dữ liệu bằng query, ex: http:192.168.1.3:8080/api/Exam/getOne?id=.....
const GetOne = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { id } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (id) {
            data = await Exam.findById(id)
                .populate({
                    path: "questions",
                    model: "Question",
                })
                .populate({
                    path: "likes",
                    model: "User",
                })
                .populate({
                    path: "save",
                    model: "User",
                });
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Exam not found" });

        console.log("Get Exam: \n" + data);
        return res.status(200).json({ data, message: "Get one thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Get 10 bài kiểm tra tốt nhất
const GetTop = async (req, res) => {
    try {
        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        data = await Exam.find({})
            .populate({
                path: "questions",
                model: "Question",
            })
            .populate({
                path: "likes",
                model: "User",
            })
            .populate({
                path: "save",
                model: "User",
            });

        // Tính điểm trung bình và sắp xếp
        const sorted = data
            .map((exam) => {
                const score =
                    (exam.views + exam.likes.length + exam.save.length) / 3;
                return { ...exam._doc, score };
            })
            .sort((a, b) => b.score - a.score) // sắp xếp giảm dần theo score
            .slice(0, 10); // lấy top 10
        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Exam not found" });

        console.log("Get Exam: \n" + sorted);
        return res
            .status(200)
            .json({ data: sorted, message: "Get all thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Create, input: title, duration, questions
const Create = async (req, res) => {
    try {
        const { title, duration, questions } = req.body;

        const newData = new Exam({ title, duration, questions });
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
// input: title, duration, questions
const Update = async (req, res) => {
    try {
        const { _id, title, duration, questions } = req.body;

        const existingData = await Exam.findById(_id);

        if (!existingData)
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });

        if (title) existingData.title = title;
        if (duration) existingData.duration = duration;
        if (questions) existingData.questions = [...questions];

        await existingData.save();

        return res
            .status(200)
            .json({ data: existingData, message: "Update thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Delete, truyền id vào query để xóa, ex: http:192.168.1.3:8080/api/Exam?id=.....
const Delete = async (req, res) => {
    try {
        const { id } = req.query; // Lấy id từ query string

        const deletedData = await Exam.findByIdAndDelete(id);

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
    GetTop,
    Create,
    Update,
    Delete,
};
