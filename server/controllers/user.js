const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

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
        data = await Subject.findById(id);

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
// DELETE /user
const Update = async (req, res) => {
    try {
        const { _id, fullname, phone, email, password } = req.body;
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
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "Tài khoản không tồn tại" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu" });
        if (user.status !== "active")
            return res.status(423).json({ message: "Tài khoản bị khóa" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({
            token,
            data: { _id: user._id, fullname: user.fullname, email: user.email },
        });
        res.data = { data, token };
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};
const Register = async (req, res) => {
    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nguyenduy7003@gmail.com", // Thay bằng email của bạn
            pass: "tesf daab xvbr fyqo", // Thay bằng mật khẩu email của bạn
        },
    });

    try {
        const { fullname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.status === "locked" && existingUser.otp !== "") {
                return res.status(401).json("Tài khoản chưa được xác thực");
            } else {
                return res.status(400).json("Email đã được sử dụng");
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Nội dung email
        const mailOptions = {
            from: "nguyenduy7003@gmail.com",
            to: email, // Email nhận
            subject: "Mã xác nhận của bạn",
            text: `Mã xác nhận của bạn là: ${otp}`,
        };
        try {
            // Gửi email
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.log("Lỗi Send otp" + error);
            return res.status(502).json({
                message: "Lỗi Server",
                details: "Lỗi Send otp" + error,
            });
        }

        const newUser = new User({
            avatar: "",
            phone: "",
            fullname,
            email,
            password: hashedPassword,
            otp,
        });
        await newUser.save();

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};
const GetOTP = async (req, res) => {
    const { email } = req.query;

    const data = await User.findOne({ email });

    // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
    if (!data) return res.status(404).json({ message: "User not found" });

    return res
        .status(200)
        .json({ data: data.otp, message: "Get OTP thành công" });
};
const SetOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const data = await User.findOne({ email });

        if (!data) return res.status(404).json({ message: "User not found" });

        data.otp = Math.floor(1000 + Math.random() * 9000);
        await data.save(); // ✅ CHỈNH chỗ này để chờ lưu xong rồi mới tiếp tục

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nguyenduy7003@gmail.com",
                pass: "tesf daab xvbr fyqo",
            },
        });

        const mailOptions = {
            from: "nguyenduy7003@gmail.com",
            to: email,
            subject: "Xác thực OTP",
            text: `OTP của bạn là: ${data.otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");

        return res.status(200).json({
            data: data.otp,
            message: "Set OTP thành công",
        });
    } catch (err) {
        console.log("Lỗi gửi email hoặc lưu OTP:", err);
        return res.status(500).json({ message: "Lỗi server" });
    }
};
const Lock = async (req, res) => {
    try {
        const { email } = req.body;

        const data = await User.findOne({ email });
        console.log(email);

        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data) return res.status(404).json({ message: "User not found" });

        data.status = "locked";
        data.otp = Math.floor(1000 + Math.random() * 9000);
        await data.save();

        console.log("Mở khóa: ", data.email);

        res.status(200).json({ data: "", message: "Khóa thành công" });
    } catch (err) {
        res.status(500).json("Lỗi server");
    }
};
const Unlock = async (req, res) => {
    try {
        const { email } = req.body;

        const data = await User.findOne({ email });
        // Nếu không có dữ liệu nào thì báo lỗi 404 - Not Found
        if (!data) return res.status(404).json({ message: "User not found" });

        data.status = "active";
        data.otp = ""; // Mỗi lần unlock thì xóa otp để kiểm soát lần vertify kế tiếp
        await data.save();

        console.log("Mở khóa: ", data.email);

        res.status(200).json("Mở khóa thành công");
    } catch (err) {
        res.status(500).json("Lỗi mở khóa tài khoản");
    }
};
const RegeneratePassword = async (req, res) => {
    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nguyenduy7003@gmail.com", // Thay bằng email của bạn
            pass: "tesf daab xvbr fyqo", // Thay bằng mật khẩu email của bạn
        },
    });
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "Tài khoản không tồn tại" });

        const newPassword = generateRandomPassword();

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        // Nội dung email
        const mailOptions = {
            from: "nguyenduy7003@gmail.com",
            to: email, // Email nhận
            subject: "Mật khẩu mới",
            text: `Mật khẩu mới của bạn là: ${newPassword}`,
        };
        try {
            // Gửi email
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.log("Lỗi Send otp" + error);
            return res.status(502).json({
                message: "Lỗi Server",
                details: "Lỗi Send otp" + error,
            });
        }

        user.save();

        console.log(`Password mới của tài khoản ${email}: ${newPassword}`);

        return res.status(200).json("Cập nhập thành công");
    } catch (err) {
        console.log("Lỗi regenerate password", err);
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
module.exports = {
    GetAll,
    GetOne,
    Login,
    Register,
    GetOTP,
    SetOTP,
    Update,
    Lock,
    Unlock,
    RegeneratePassword,
};
