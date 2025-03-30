import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API = "http://192.168.1.3:8080/api/";
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra user khi mở app
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            const storedUser = await AsyncStorage.getItem("user");

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    // Đăng nhập
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API}user/login`, {
                email,
                password,
            });

            // Lưu vào AsyncStorage
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(res.data.data));

            setToken(res.data.token);
            setUser(res.data.data);
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
        }
    };

    // Đăng ký
    const register = async (fullname, email, password) => {
        try {
            console.log(fullname);

            const res = await axios.post(`${API}user/register`, {
                fullname,
                email,
                password,
            });
        } catch (err) {
            console.error("Lỗi đăng ký:", err);
        }
    };

    // Đăng xuất
    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, register, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
