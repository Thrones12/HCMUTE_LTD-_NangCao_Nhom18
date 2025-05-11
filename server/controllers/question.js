const Question = require("../models/Question");
const Exam = require("../models/Exam");
const Lesson = require("../models/Lesson");

// GET /question
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await Question.find({});

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /question/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await Question.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /question
const Create = async (req, res) => {
    try {
        const { question, options, answer, hint, explanation, level } =
            req.body;

        // Create
        const data = new Question({
            question,
            options,
            answer,
            hint,
            explanation,
            level,
        });
        data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /question
const Update = async (req, res) => {
    try {
        const { id, question, options, answer, hint, explanation, level } =
            req.body;

        // Get data
        const data = await Question.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (question) data.question = question;
        if (options) data.options = [...options];
        if (answer) data.answer = answer;
        if (hint) data.hint = hint;
        if (explanation) data.explanation = explanation;
        if (level) data.level = level;
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /question?id=...
const Delete = async (req, res) => {
    try {
        const { id } = req.query;

        // Delete
        const data = await Question.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xóa question trong exam
        {
            const exams = (await Exam.find({})).filter((exam) =>
                exam.questions.some((question) => question.toString() === id)
            );
            // 404 - Not Found
            if (!exams)
                return res.status(404).json({ message: "Data Not Found" });
            for (let item of exams) {
                let exam = await Exam.findById(item._id);
                exam.questions = exam.questions.filter(
                    (question) => question.toString() !== id
                );
                await exam.save();
            }
        }

        // Xóa question trong lesson
        {
            const lessons = (await Lesson.find({})).filter((lesson) =>
                lesson.questions.some((question) => question.toString() === id)
            );
            // 404 - Not Found
            if (!lessons)
                return res.status(404).json({ message: "Data Not Found" });
            for (let item of lessons) {
                let lesson = await Lesson.findById(item._id);
                lesson.questions = lesson.questions.filter(
                    (question) => question.toString() !== id
                );
                await lesson.save();
            }
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
