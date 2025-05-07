import { Constant } from "@/constants";
import Noti from "@/utils/Noti";
import axios from "axios";
const API = Constant.API;
const GetAllActive = async () => {
    try {
        // Call API
        const res = await axios.get(`${API}/banner?isActive${true}`);
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

export default { GetAllActive };
