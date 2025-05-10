import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetAll = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/exam`);
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
const GetOne = async (examId: string) => {
    try {
        // Call API
        const res = await axios.get(`${API}/exam/get-one?id=${examId}`);
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
const Like = async (examId: string, userId: string) => {
    try {
        // Call API
        await axios.put(`${API}/exam/like`, { examId, userId });
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
const Unlike = async (examId: string, userId: string) => {
    try {
        // Call API
        await axios.put(`${API}/exam/unlike`, { examId, userId });
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
const Save = async (examId: string, userId: string) => {
    try {
        // Call API
        await axios.put(`${API}/exam/save`, { examId, userId });
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
const Unsave = async (examId: string, userId: string) => {
    try {
        // Call API
        await axios.put(`${API}/exam/unsave`, { examId, userId });
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
export default { GetAll, GetOne, Like, Unlike, Save, Unsave };
