const Exam = require("../models/Exam");
const ExamResult = require("../models/ExamResult");
const User = require("../models/User");
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const { GenerateTag } = require("../utils/Generator");

// GET /exam
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await Exam.find({}).populate({
            path: "questions",
            model: "Question",
        });

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /exam/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Exam.findById(id).populate({
            path: "questions",
            model: "Question",
        });

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// Get /exam/get-top
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
                path: "saves",
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
// POST /exam
const Create = async (req, res) => {
    try {
        const { courseId, subjectId, title, duration, questions, level } =
            req.body;

        // Get course và subject để lấy title
        let course = await Course.findById(courseId);
        let subject = await Subject.findById(subjectId);

        // Create
        let tag = GenerateTag(`${title} ${course.title} ${subject.title}`);
        const data = new Exam({
            title,
            courseTitle: course.title,
            subjectTitle: subject.title,
            tag,
            duration,
            questions,
            level,
        });
        data.save();

        // Thêm exam vào subject
        if (subjectId) {
            let subject = await Subject.findById(subjectId);
            subject.exams.push(data._id);
            await subject.save();
        }

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /exam
const Update = async (req, res) => {
    try {
        const { id, title, duration, questions, level } = req.body;

        // Get data
        const data = await Exam.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (title) {
            data.title = title;
            let tag = GenerateTag(
                `${title} ${data.courseTitle} ${data.subjectTitle}`
            );
            data.tag = tag;
        }
        if (duration) data.duration = duration;
        if (questions) data.questions = [...questions];
        if (level) data.level = level;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /exam
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Exam.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xóa Exam Result
        await ExamResult.deleteMany({ exam: id });

        // Xóa result trong Exam Result của User

        // Xóa exam trong subject

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
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
