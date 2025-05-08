const removeVietnameseTones = (str: string) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
};
const getKeywords = (text: string) => {
    return removeVietnameseTones(text)
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
};
const getMatchScore = (keywords: string[], tag: string) => {
    const tagWords = tag.split("-");
    let matchCount = 0;
    keywords.forEach((kw) => {
        tagWords.forEach((tw) => {
            if (tw.startsWith(kw)) matchCount++; // so khớp một phần từ đầu
        });
    });
    return matchCount;
};
export default {
    removeVietnameseTones,
    getKeywords,
    getMatchScore,
};
