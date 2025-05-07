const Subject = require("../models/Subject");
const Course = require("../models/Course");

// GET /subject
const GetAll = async (req, res) => {
    try {
        const { courseId } = req.query;
        let data; // Return data

        // Get data
        if (courseId) {
            let course = await Course.findById(courseId).populate({
                path: "subjects",
                model: "Subject",
            });
            data = course.subjects;
        } else {
            data = await Subject.find({});
        }

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /subject/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Subject.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /subject
const Create = async (req, res) => {
    try {
        const { courseId, title, lessons, exams } = req.body;

        // Create
        const data = new Subject({ title, lessons, exams });
        data.save();

        // Thêm subject vào course
        if (courseId) {
            let course = await Course.findById(courseId);
            course.subjects.push(data._id);
            await course.save();
        }

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /subject
const Update = async (req, res) => {
    try {
        const { id, title, lessons, exams } = req.body;

        // Get data
        const data = await Subject.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (title) data.title = title;
        if (lessons) data.lessons = [...lessons];
        if (exams) data.exams = [...exams];
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /subject?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Subject.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

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
