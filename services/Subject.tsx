import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetAll = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/subject`);
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
const GetAllByCourse = async (courseId: string) => {
    try {
        // Call API
        const res = await axios.get(`${API}/subject?courseId=${courseId}`);
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
const GetOne = async (subjectId: any) => {
    try {
        // Call API
        const res = await axios.get(`${API}/subject/get-one?id=${subjectId}`);
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

export default { GetAll, GetAllByCourse, GetOne };
