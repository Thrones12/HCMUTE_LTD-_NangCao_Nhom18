import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Notification from "@/services/Notification";
import { Constant } from "@/constants/Constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API = Constant.API;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Kiểm tra user khi mở app
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            const storedUser = await AsyncStorage.getItem("user");
            console.log(storedToken);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        };
        loadUser();
    }, []);

    // Đăng nhập
    const login = async (email, password) => {
        if (!email || !password) {
            Notification.info("Mời nhập email và mật khẩu");
            return;
        }
        try {
            const res = await axios.post(`${API}/user/login`, {
                email,
                password,
            });
            // Lưu vào AsyncStorage
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(res.data.data));

            setToken(res.data.token);
            setUser(res.data.data);

            Notification.success("Đăng nhập thành công");
        } catch (err) {
            if (err.status === 404)
                Notification.info("Tài khoản không tồn tại");
            else if (err.status === 401) Notification.info("Sai mật khẩu");
            else if (err.status === 423) Notification.info("Tài khoản bị khóa");
            else Notification.error("Lỗi đăng nhập");
        }
    };

    // Đăng ký
    const register = async (fullname, email, password) => {
        if (!fullname || !email || !password) {
            Notification.info("Mời điền đủ thông tin");
            return;
        }
        try {
            await axios.post(`${API}/user/register`, {
                fullname,
                email,
                password,
            });
            Notification.success("OTP đã được gửi qua email");
            return true;
        } catch (err) {
            if (err.status === 400) Notification.info("Email đã được sử dụng");
            else if (err.status === 502)
                Notification.info("Email không hợp lệ");
            // tài khoản chưa xác thực
            else if (err.status === 401) {
                return "notVertify";
            } else Notification.error("Lỗi đăng ký");
        }

        return false;
    };

    // Đăng xuất
    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            setToken(null);
            setUser(null);
            Notification.success("Đăng xuất thành công");
        } catch (err) {
            Notification.error("Lỗi đăng xuất");
        }
    };

    // Xác thực otp
    const vertify = async (otp, input, email, type) => {
        try {
            if (otp === input) {
                console.log(input);

                const res = await axios.put(`${API}/user/unlock`, { email });
                if (res.status === 200) {
                    if (type === "forget") {
                        await regeneratePassword(email);
                        Notification.success(
                            "Xác thực thành công, mật khẩu mới đã được gửi qua email"
                        );
                    } else Notification.success("Xác thực thành công");
                    return true;
                } else {
                    Notification.info("Xác thực không thành công");
                }
            } else {
                Notification.info("OTP không đúng");
            }
        } catch (err) {
            Notification.error("Lỗi xác thực");
        }
        return false;
    };

    // Khóa tài khoản
    const lockForRegeneratePassword = async (email) => {
        if (!email) {
            Notification.info("Mời nhập email");
            return;
        }
        try {
            await axios.put(`${API}/user/lock`, { email });
            Notification.success("OTP đã được gửi qua email");
            return true;
        } catch (err) {
            if (err.status === 404) {
                Notification.info("Email chưa được đăng ký");
            } else {
                Notification.error("Lỗi khóa tài khoản");
            }
        }
        return false;
    };

    const regeneratePassword = async (email) => {
        try {
            await axios.put(`${API}/user/regenerate-password`, {
                email,
            });
            Notification.success("Mật khẩu tài khoản đã được gửi qua email");
            return true;
        } catch (err) {
            if (err.status === 404)
                Notification.info("Tài khoản không tồn tại");
            else if (err.status === 502)
                Notification.error("Gửi mail thất bại");
            else Notification.error("Lỗi quên mật khẩu");
        }
        return false;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                register,
                vertify,
                regeneratePassword,
                lockForRegeneratePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
