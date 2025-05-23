import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetOne = async (userId: any) => {
    try {
        // Call API
        const res = await axios.get(`${API}/user/get-one?id=${userId}`);
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
const MinusPoint = async (userId: any, point: any) => {
    try {
        // Call API
        const res = await axios.put(`${API}/user/minus-point`, {
            userId,
            point,
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
export default { GetOne, MinusPoint };
