import { View, Text, StatusBar } from "react-native";
import RootNavigator from "@/navigators/RootNavigator";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function App() {
    const [token, setToken] = useState("");
    const { getItem, setItem } = useAsyncStorage("token");

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        const token = await getItem();
        token && setToken(token);
    };
    return (
        <AuthProvider>
            <StatusBar
                barStyle={"dark-content"}
                translucent
                backgroundColor={"transparent"}
            />
            <RootNavigator />
            <Toast />
        </AuthProvider>
    );
}
