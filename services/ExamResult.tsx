import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetAll = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/exam-result`);
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
        const res = await axios.get(`${API}/exam-result/get-one?id=${examId}`);
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
const SubmitExam = async ({ userId, exam, score, duration, answers }: any) => {
    try {
        // Call API
        const res = await axios.post(`${API}/exam-result/submit`, {
            userId,
            exam,
            score,
            duration,
            answers,
        });
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
export default { GetAll, GetOne, SubmitExam };
