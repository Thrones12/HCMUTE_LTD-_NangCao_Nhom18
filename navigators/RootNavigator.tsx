import { StatusBar } from "react-native";
import { AuthNavigator, MainNavigator } from "@/navigators";
import { AuthProvider, AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const RootNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null; // Chờ kiểm tra đăng nhập tránh lỗi

    return user ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
