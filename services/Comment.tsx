import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetAll = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/course`);
        return res.data.data;
    } catch (err: any) {
        // Thông báo lỗi
        if (err.response && err.response.data?.message) {
            Noti.error(err.response.data.message);
        } else {
            Noti.error("Lỗi hệ thống");
        }
        return null;
    }
};
const GetAllByLesson = async (lessonId: string) => {
    try {
        // Call API
        const res = await axios.get(`${API}/comment?lessonId=${lessonId}`);
        return res.data.data;
    } catch (err: any) {
        // Thông báo lỗi
        if (err.response && err.response.data?.message) {
            Noti.error(err.response.data.message);
        } else {
            Noti.error("Lỗi hệ thống");
        }
        return null;
    }
};
const Like = async (commentId: string, userId: string) => {
    try {
        // Call API
        await axios.put(`${API}/comment/like`, { commentId, userId });
    } catch (err: any) {
        // Thông báo lỗi
        if (err.response && err.response.data?.message) {
            Noti.error(err.response.data.message);
        } else {
            Noti.error("Lỗi hệ thống");
        }
        return null;
    }
};
const Unlike = async (commentId: string, userId: string) => {
    try {
        // Call API
        await axios.put(`${API}/comment/unlike`, { commentId, userId });
    } catch (err: any) {
        // Thông báo lỗi
        if (err.response && err.response.data?.message) {
            Noti.error(err.response.data.message);
        } else {
            Noti.error("Lỗi hệ thống");
        }
        return null;
    }
};
const Create = async ({ lessonId, user, content, replyTo }: any) => {
    try {
        // Call API
        const res = await axios.post(`${API}/comment`, {
            lessonId,
            user,
            content,
            replyTo,
        });
        return res.data.data;
    } catch (err: any) {
        // Thông báo lỗi
        if (err.response && err.response.data?.message) {
            Noti.error(err.response.data.message);
        } else {
            Noti.error("Lỗi hệ thống");
        }
        return null;
    }
};

export default { GetAll, GetAllByLesson, Like, Unlike, Create };
