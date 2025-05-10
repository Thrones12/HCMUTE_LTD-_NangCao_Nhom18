const ExamResult = require("../models/ExamResult");
const User = require("../models/User");

// GET /exam-result
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await ExamResult.find({});

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /exam-result/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await ExamResult.findById(id);

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /exam-result
const Create = async (req, res) => {
    try {
        const { userId, exam, score, duration, answers } = req.body;
        // Create
        const data = new ExamResult({ userId, exam, score, duration, answers });
        data.save();

        // Thêm exam result vào user
        const user = await User.findById(userId);
        user.examResults.push(data._id.toString());
        await user.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};

// POST /exam-result/submit
const Submit = async (req, res) => {
    try {
        const { userId, exam, score, duration, answers } = req.body;
        // Kiểm tra result của exam đã có chưa
        const existingData = await ExamResult.findOne({ userId, exam });

        if (!existingData) {
            // Create
            const data = new ExamResult({
                userId,
                exam,
                score,
                duration,
                answers,
            });
            await data.save();

            // Thêm exam result vào user
            const user = await User.findById(userId);
            user.examResults.push(data._id.toString());
            await user.save();
        } else {
            // Update
            if (existingData.score < score) {
                existingData.score = score;
                existingData.duration = duration;
                existingData.answers = [...answers];
            } else if (
                existingData.score === score &&
                existingData.duration > duration
            ) {
                existingData.duration = duration;
                existingData.answers = [...answers];
            }
            await existingData.save();
        }

        // 200 - Success
        return res.status(200).json({ data: existingData });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /exam-result
const Update = async (req, res) => {
    try {
        const { id, score, duration, answers } = req.body;

        // Get data
        const data = await ExamResult.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Update
        if (score) data.score = score;
        if (duration) data.duration = duration;
        if (answers) data.answers = [...answers];
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// DELETE /exam-result
const Delete = async (req, res) => {
    try {
        const { id } = req.query; // Lấy id từ query string

        // Delete
        const data = await ExamResult.findByIdAndDelete(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data Not Found" });

        // Xóa result trong Exam Result của User
        const user = (await User.find({})).find((user) =>
            user.examResults.some((result) => result.toString() === id)
        );
        // 404 - Not Found
        if (!user) return res.status(404).json({ message: "Data Not Found" });
        let newData = user.examResults.filter(
            (result) => result.toString() !== id
        );
        user.examResults = newData;
        await user.save();

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
    Submit,
    Update,
    Delete,
};
