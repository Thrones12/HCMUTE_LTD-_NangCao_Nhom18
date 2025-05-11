const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const { SendMail } = require("../utils/Mail");
const { GenerateRandomPassword } = require("../utils/Generator");
// GET /user
const GetAll = async (req, res) => {
    try {
        const {} = req.query;
        let data; // Return data

        // Get data
        data = await User.find({});

        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// GET /user/get-one?id=...
const GetOne = async (req, res) => {
    try {
        const { id } = req.query;
        let data; // Return data

        // Get data
        data = await User.findById(id);
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /user
// PUT /user
const Update = async (req, res) => {
    try {
        const { _id, fullname, phone, email, password } = req.body;
        console.log(_id);
        const file = req.file;

        const existingData = await User.findById(_id);

        if (!existingData)
            return res
                .status(404)
                .json({ data: [], message: "Không tìm thấy dữ liệu" });

        if (fullname) existingData.fullname = fullname;
        if (phone) existingData.phone = phone;
        if (email) existingData.email = email;
        if (password && existingData.password !== password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingData.password = hashedPassword;
        }

        if (file) {
            try {
                const uploadResult = await streamUpload(file.buffer);
                existingData.avatar = uploadResult.secure_url;
            } catch (err) {
                return res.status(500).json({ message: "Lỗi upload ảnh" });
            }
        }

        await existingData.save();
        return res.status(200).json({
            data: existingData,
            message: "Update thành công",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ data: [], message: "Lỗi server" });
    }
};
const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "users" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};
// POST /user/login
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get user
        const user = await User.findOne({ email });
        // 404 - Not Found
        if (!user) return res.status(404).json({ message: "Data Not Found" });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password); // So sánh mật khẩu trong CSDL với được nhập
        if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu" });

        // Kiểm tra status của tài khoản
        if (user.status === "NotVerify")
            return res.status(422).json({
                isVerify: false,
                message: "Tài khoản chưa được kích hoạt",
            });
        if (user.status === "Locked")
            return res.status(423).json({ message: "Tài khoản bị khóa" });

        // Tạo token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        // 200 - Success
        return res.status(200).json({ token, data: user._id });
    } catch (error) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /user/register
const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Kiểm tra email đã đăng ký chưa
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.status === "NotVerify") {
                return res.status(401).json({
                    isVerify: false,
                    message: "Tài khoản chưa được xác thực",
                });
            } else {
                return res.status(400).json("Tài khoản đã tồn tại");
            }
        }
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create
        const data = new User({
            avatar: "",
            phone: "",
            fullname,
            email,
            password: hashedPassword,
        });
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /user/send-otp
const SendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Tạo OTP
        let data = Math.floor(1000 + Math.random() * 9000);

        // Gửi mail
        let mail = await SendMail(
            email,
            "Mã xác thực",
            `Mã xác thực OTP của bạn là: ${data}`
        );

        if (mail) {
            // 200 - Success
            return res.status(200).json({ data });
        } else {
            // 400 - Failed
            return res
                .status(400)
                .json({ message: "Gửi email không thành công" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// POST /user/send-password
const SendPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Get user
        let data = await User.findOne({ email });
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // Tạo mật khẩu mới
        let newPassword = GenerateRandomPassword();

        // Gửi mail
        let mail = await SendMail(
            email,
            "Quên mật khẩu",
            `Mật khẩu mới của bạn là: ${newPassword}`
        );

        if (mail) {
            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Lưu mật khẩu mới
            data.password = hashedPassword;
            await data.save();

            // 200 - Success
            return res.status(200).json({ data });
        } else {
            // 400 - Failed
            return res
                .status(400)
                .json({ message: "Gửi email không thành công" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};
// PUT /user/activate
const Activate = async (req, res) => {
    try {
        const { email } = req.body;

        // Get user
        let data = await User.findOne({ email });
        // 404 - Not Found
        if (!data) return res.status(404).json({ message: "Data not found" });

        // Kích hoạt tài khoản
        data.status = "Active";
        await data.save();

        // 200 - Success
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ message: "Server Error: ", err });
    }
};

module.exports = {
    GetAll,
    GetOne,
    Login,
    Register,
    SendOTP,
    SendPassword,
    Activate,
    Update,
};
