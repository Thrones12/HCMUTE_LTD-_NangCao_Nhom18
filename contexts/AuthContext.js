import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Noti from "@/utils/Noti";
import { Constant } from "@/constants/Constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API = Constant.API;
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    // Kiểm tra user khi mở app
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            const storedUser = await AsyncStorage.getItem("userId");

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUserId(JSON.parse(storedUser));
            }
        };
        loadUser();
    }, []);
    // Đăng nhập - 0: Thành công, 1: Thất bại, 2: Cần xác thực
    const Login = async (email, password) => {
        // Kiểm tra email và password
        if (!email.trim() || !password.trim()) {
            Noti.info("Mời nhập email và mật khẩu");
            return 1;
        }
        try {
            // Call API
            console.log(email, password);

            const res = await axios.post(`${API}/user/login`, {
                email,
                password,
            });

            // Lưu vào AsyncStorage
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("userId", JSON.stringify(res.data.data));
            // Set State
            setToken(res.data.token);
            setUserId(res.data.data);
            // Thông báo
            Noti.success("Đăng nhập thành công");
            return 0;
        } catch (err) {
            // Tài khoản chưa xác thực
            if (err.response && !err.response.data?.isVerify) {
                return 2;
            }
            // Thông báo lỗi
            else {
                if (err.response && err.response.data?.message) {
                    Noti.error(err.response.data.message);
                } else {
                    Noti.error("Lỗi hệ thống");
                }
                return 1;
            }
        }
    };
    // Đăng ký - 0: Thành công, 1: Thất bại, 2: Cần xác thực
    const Register = async (fullname, email, password) => {
        // Kiểm tra fullname, email và password
        if (!fullname || !email || !password) {
            Noti.info("Mời điền đủ thông tin");
            return 1;
        }
        try {
            // Call API
            await axios.post(`${API}/user/register`, {
                fullname,
                email,
                password,
            });
            return 0;
        } catch (err) {
            // Tài khoản chưa xác thực
            if (err.response && !err.response.data?.isVerify) {
                return 2;
            }
            // Thông báo lỗi
            else {
                if (err.response && err.response.data?.message) {
                    Noti.error(err.response.data.message);
                } else {
                    Noti.error("Lỗi hệ thống");
                }
                return 1;
            }
        }
    };
    // Đăng xuất
    const Logout = async () => {
        try {
            // Xóa dữ liệu trong storage
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userId");
            // Xóa dữ liệu state
            setToken(null);
            setUserId(null);
            // Thông báo
            Noti.success("Đăng xuất thành công");
        } catch (err) {
            if (err.response && err.response.data?.message) {
                Noti.error(err.response.data.message);
            } else {
                Noti.error("Lỗi hệ thống");
            }
        }
    };
    // Gửi mã OTP về email
    const SendOtp = async (email) => {
        try {
            // Call API
            const res = await axios.post(`${API}/user/send-otp`, { email });
            // Thông báo
            return res.data.data;
        } catch (err) {
            // Thông báo lỗi
            if (err.response && err.response.data?.message) {
                Noti.error(err.response.data.message);
            } else {
                Noti.error("Lỗi hệ thống");
            }
            return null;
        }
    };
    // Kích hoạt tài khoản
    const ActivateAccount = async (email) => {
        try {
            // Call API
            await axios.put(`${API}/user/activate`, { email });
        } catch (err) {
            // Thông báo lỗi
            if (err.response && err.response.data?.message) {
                Noti.error(err.response.data.message);
            } else {
                Noti.error("Lỗi hệ thống");
            }
        }
    };
    // Gửi mật khẩu mới về mail
    const SendPassword = async (email) => {
        try {
            // Call API
            await axios.post(`${API}/user/send-password`, { email });
        } catch (err) {
            // Thông báo lỗi
            if (err.response && err.response.data?.message) {
                Noti.error(err.response.data.message);
            } else {
                Noti.error("Lỗi hệ thống");
            }
        }
    };
    return (
        <AuthContext.Provider
            value={{
                userId,
                token,
                Login,
                Register,
                Logout,
                SendOtp,
                ActivateAccount,
                SendPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
