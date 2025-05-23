import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetAll = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/lesson`);
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
const GetAllBySubject = async (subjectId: string) => {
    try {
        // Call API
        const res = await axios.get(`${API}/lesson?subjectId=${subjectId}`);
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
const GetTopLesson = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/lesson/get-top`);
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
const GetOne = async (lessonId: string) => {
    try {
        // Call API
        const res = await axios.get(`${API}/lesson/get-one?id=${lessonId}`);
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
const Rating = async (lessonId: string, userId: string, rating: number) => {
    try {
        // Call API
        const res = await axios.post(`${API}/lesson/rating`, {
            lessonId,
            userId,
            rating,
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
export default { GetAll, GetAllBySubject, GetTopLesson, GetOne, Rating };
