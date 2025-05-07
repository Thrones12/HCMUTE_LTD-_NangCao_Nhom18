const Lesson = require("../models/Lesson");
const Comment = require("../models/Comment");
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const { GenerateTag } = require("../utils/Generator");

// GET /lesson
const GetAll = async (req, res) => {
    try {
        const { subjectId } = req.query;
        let data; // Return data

        // Get data
        if (subjectId) {
            let subject = await Subject.findById(subjectId).populate({
                path: "lessons",
                model: "Lesson",
            });
            data = subject.lessons;
        } else {
            data = await Lesson.find({});
        }

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /course/get-top
const GetTop = async (req, res) => {
    try {
        // Lấy top 10 bài học, sắp xếp giảm dần theo attemptCount
        const data = await Lesson.find({})
            .sort({ attemptCount: -1 }) // Sắp xếp giảm dần
            .limit(10); // Giới hạn 10 bài học

        // 404 - Not Found
        if (!data || data.length === 0)
            return res.status(404).json({ message: "No data found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error", err });
    }
};
// GET /course/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Lesson.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /lesson
const Create = async (req, res) => {
    try {
        const {
            title,
            courseId,
            subjectId,
            videoUrl,
            document,
            guide,
            questions,
        } = req.body;

        // Get course và subject để lấy title
        let course = await Course.findById(courseId);
        let subject = await Subject.findById(subjectId);

        // Create
        let tag = GenerateTag(`${title} ${course.title} ${subject.title}`);
        const data = new Lesson({
            title,
            courseTitle: course.title,
            subjectTitle: subject.title,
            tag,
            videoUrl,
            document,
            guide,
            questions,
        });
        data.save();

        // Thêm lesson vào subject
        if (subjectId) {
            let subject = await Subject.findById(subjectId);
            subject.lessons.push(data._id);
            await subject.save();
        }

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /lesson
const Update = async (req, res) => {
    try {
        const {
            id,
            title,
            courseTitle,
            subjectTitle,
            videoUrl,
            document,
            guide,
            questions,
            comments,
        } = req.body;

        // Get data
        const data = await Lesson.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (title) data.title = title;
        if (courseTitle) data.courseTitle = courseTitle;
        if (subjectTitle) data.subjectTitle = subjectTitle;
        if (videoUrl) data.videoUrl = videoUrl;
        if (document) data.document = document;
        if (guide) data.guide = guide;
        if (questions) data.questions = [...questions];
        if (comments) data.comments = [...comments];
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /course?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Lesson.findByIdAndDelete(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xóa comment trong lesson
        for (let commentId of data.comments) {
            await Comment.findByIdAndDelete(commentId.toString());
        }

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
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
