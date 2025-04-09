export const Data = {
    course: [
        {
            _id: "1",
            title: "Lớp 10",
            subjects: [
                {
                    _id: "1",
                    title: "Vật lý",
                    lessons: [
                        { title: "Bài 1: vật lý lớp 10 bài 1" },
                        { title: "Bài 2: vật lý lớp 10 bài 2" },
                        { title: "Bài 3: vật lý lớp 10 bài 3" },
                        { title: "Bài 4: vật lý lớp 10 bài 4" },
                    ],
                },
                { _id: "2", title: "Hóa học", lessons: [] },
                { _id: "3", title: "Toán học", lessons: [] },
            ],
        },
        {
            _id: "2",
            title: "Lớp 11",
            subjects: [
                { _id: "4", title: "Địa lí", lessons: [] },
                { _id: "5", title: "Lịch sử", lessons: [] },
                { _id: "6", title: "GDCD", lessons: [] },
            ],
        },
        {
            _id: "3",
            title: "Lớp 12",
            subjects: [
                { _id: "7", title: "Mỹ thuật", lessons: [] },
                { _id: "8", title: "Âm nhạc", lessons: [] },
                { _id: "9", title: "Công nghệ", lessons: [] },
            ],
        },
    ],
    comments: [
        {
            _id: "1",
            user: {
                name: "Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
            },
            content: "Bài học rất hay!",
            createdAt: "2025-04-08T08:00:00Z",
        },
        {
            _id: "2",
            user: {
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=2",
            },
            content: "Mình không hiểu phần công thức lắm 😢",
            createdAt: "2025-04-08T10:00:00Z",
        },
        {
            _id: "3",
            user: {
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=2",
            },
            content: "Mình không hiểu phần công thức lắm 😢",
            createdAt: "2025-04-08T10:00:00Z",
        },
        {
            _id: "4",
            user: {
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=2",
            },
            content: "Mình không hiểu phần công thức lắm 😢",
            createdAt: "2025-04-08T10:00:00Z",
        },
        {
            _id: "5",
            user: {
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=2",
            },
            content: "Mình không hiểu phần công thức lắm 😢",
            createdAt: "2025-04-08T10:00:00Z",
        },
    ],
    notifications: [
        {
            id: "1",
            message: "Nguyễn Văn A đã thích bài viết của bạn",
            time: "2025-04-08T09:00:00Z",
        },
        {
            id: "2",
            message: "Trần Thị B đã bình luận về bài học của bạn",
            time: "2025-04-08T10:15:00Z",
        },
        {
            id: "3",
            message: "Lê Minh C đã bắt đầu theo dõi bạn",
            time: "2025-04-07T22:30:00Z",
        },
    ],
    activities: [
        {
            id: "1",
            time: "09:00",
            date: "08/04",
            type: "comment",
            content: "Bạn đã bình luận vào bài học Vật lý 10.",
        },
        {
            id: "2",
            time: "08:45",
            date: "08/04",
            type: "test",
            content: "Bạn đã hoàn thành bài kiểm tra Sinh học.",
        },
        {
            id: "3",
            time: "08:30",
            date: "08/04",
            type: "favorite",
            content: "Bạn đã yêu thích bài học Toán học 11.",
        },
    ],
};
