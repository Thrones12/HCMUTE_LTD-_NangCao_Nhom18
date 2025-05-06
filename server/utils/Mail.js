const nodemailer = require("nodemailer");
module.exports = {
    async SendMail(email, subject, text) {
        // Cấu hình Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nguyenduy7003@gmail.com", // Thay bằng email của bạn
                pass: "tesf daab xvbr fyqo", // Thay bằng mật khẩu email của bạn
            },
        });

        // Nội dung email
        const mailOptions = {
            from: "nguyenduy7003@gmail.com",
            to: email, // Email nhận
            subject: subject,
            text: text,
        };
        try {
            // Gửi email
            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            return false;
        }
    },
};
