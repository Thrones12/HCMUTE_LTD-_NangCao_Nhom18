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
};
