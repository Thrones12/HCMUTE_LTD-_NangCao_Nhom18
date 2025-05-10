function formatDuration(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    let result = "";
    if (h > 0) result += `${h.toFixed(0)} giờ`;
    if (m > 0) result += `${m.toFixed(0)} phút`;

    return result || "0s";
}
function formatTimeAgo(date: Date) {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    const units = [
        { name: "năm", seconds: 365 * 24 * 60 * 60 },
        { name: "tháng", seconds: 30 * 24 * 60 * 60 },
        { name: "tuần", seconds: 7 * 24 * 60 * 60 },
        { name: "ngày", seconds: 24 * 60 * 60 },
        { name: "giờ", seconds: 60 * 60 },
        { name: "phút", seconds: 60 },
        { name: "giây", seconds: 1 },
    ];

    for (let unit of units) {
        const count = Math.floor(diff / unit.seconds);
        if (count >= 1) {
            return `${count} ${unit.name}${count > 1 ? "" : ""} trước`;
        }
    }

    return "Vừa xong";
}
const formatChapterTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
};
export default {
    formatDuration,
    formatTimeAgo,
    formatChapterTime,
};
