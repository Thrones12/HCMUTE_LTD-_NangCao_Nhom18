module.exports = {
    GenerateTag(title) {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // xoá dấu
            .replace(/đ/g, "d") // đ → d
            .replace(/[^a-z0-9\s-]/g, "") // xoá ký tự đặc biệt
            .trim()
            .replace(/\s+/g, "-"); // thay khoảng trắng bằng dấu gạch
    },
    GenerateRandomPassword() {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";

        const allChars = uppercase + lowercase + numbers;
        let password = "";

        // Đảm bảo có ít nhất 1 ký tự mỗi loại
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];

        // Thêm các ký tự ngẫu nhiên còn lại
        for (let i = 3; i < 8; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Trộn ngẫu nhiên chuỗi
        return password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    },
};
