const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

const GetAll = async (req, res) => {
    console.log("ser");
    // Các query có thể có khi get data
    const {} = req.query;

    let data; // Biến lưu trữ dữ liệu ban đầu khi get

    // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
    {
        data = await User.find({});
    }

    // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
    if (!data) return res.status(404).json({ message: "User not found" });

    console.log("Get user: \n" + data);
    res.json(data);
};

const GetOne = async (req, res) => {
    // Các query có thể có khi get data
    const { id, email } = req.query;

    let data; // Biến lưu trữ dữ liệu ban đầu khi get

    // Nếu có 1 biến query phù hợp thì sẽ get còn không thì trả về toàn bộ dữ liệu trong csdl
    if (id) {
        data = await User.findById(id);
    } else if (email) {
        data = await User.findOne({ email });
    }

    // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
    if (!data) return res.status(404).json({ message: "User not found" });

    console.log("Get user: \n" + data);
    res.json(data);
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ message: "Người dùng không tồn tại" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });
        if (user.status !== "active")
            return res.status(400).json({ message: "Tài khoản bị khóa" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({
            token,
            data: { id: user._id, fullname: user.fullname, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email đã được sử dụng" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            otp,
        });
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

const SendOTP = async (req, res) => {
    const { email } = req.body;

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nguyenduy7003@gmail.com", // Thay bằng email của bạn
            pass: "tesf daab xvbr fyqo", // Thay bằng mật khẩu email của bạn
        },
    });

    const user = await User.findOne({ email });
    // Nội dung email
    const mailOptions = {
        from: "nguyenduy7003@gmail.com",
        to: email, // Email nhận
        subject: "Mã xác nhận của bạn",
        text: `Mã xác nhận của bạn là: ${user.otp}`,
    };

    try {
        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).json("Email sent successfully");
    } catch (error) {
        console.log("Lỗi Send otp" + error);
        res.status(500).json({
            message: "Lỗi Server",
            details: "Lỗi Send otp" + error,
        });
    }
};

function generateRandomPassword() {
    const length = 8; // Độ dài tối thiểu
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "@$!%*?&";

    // Chọn ít nhất một ký tự từ mỗi nhóm
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomSpecialChar =
        specialChars[Math.floor(Math.random() * specialChars.length)];

    // Gộp các ký tự còn lại để đủ độ dài
    const allChars = letters + numbers + specialChars;
    const remainingLength = length - 3;
    let remainingChars = "";

    for (let i = 0; i < remainingLength; i++) {
        remainingChars += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Gộp tất cả các ký tự lại và trộn ngẫu nhiên
    const passwordArray = [
        randomLetter,
        randomNumber,
        randomSpecialChar,
        ...remainingChars,
    ].sort(() => Math.random() - 0.5);

    return passwordArray.join("");
}
module.exports = { GetAll, GetOne, Login, Register, SendOTP };
