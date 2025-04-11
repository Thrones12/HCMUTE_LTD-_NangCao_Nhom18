const Activity = require("../models/activity");
const User = require("../models/user");

// Get toàn bộ dữ liệu, query
// - userId: get toàn bộ activity trong history của user
const GetAll = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { userId } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (userId) {
            let tempData = await User.findById(userId).populate({
                path: "histories",
                model: "Activity",
            });
            data = tempData.histories;
        } else {
            data = await Activity.find({});
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Activity not found" });

        console.log("Get Activity: \n" + data);
        return res.status(200).json({ data, message: "Get all success" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Get dữ liệu bằng query, ex: http:192.168.1.3:8080/api/activity/getOne?id=.....
const GetOne = async (req, res) => {
    try {
        // Các query có thể có khi get data
        const { id } = req.query;

        let data; // Biến lưu trữ dữ liệu ban đầu khi get

        // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
        if (id) {
            data = await Activity.findById(id);
        }

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data)
            return res
                .status(404)
                .json({ data: [], message: "Activity not found" });

        console.log("Get Activity: \n" + data);
        res.json({ data, message: "Get all activity" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Create, input:  userId, type, message
// - userId: dùng để thêm activity vào history của user
const Create = async (req, res) => {
    try {
        const { userId, type, message } = req.body;

        const newData = new Activity({ type, message });
        newData.save();

        const user = await User.findById(userId);
        user.histories.push(newData._id.toString());
        user.save();

        return res
            .status(200)
            .json({ data: newData, message: "Create thành công" });
    } catch (err) {
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};

// Update
// _id: quan trọng, dùng để tìm doc update
// input: type, message
const Update = async (req, res) => {
    try {
        const { _id, type, message } = req.body;

        const existingData = await Activity.findById(_id);

        if (!existingData)
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });

        if (type) existingData.type = type;
        if (message) existingData.message = message;

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

        const deletedData = await Activity.findByIdAndDelete(id);

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
