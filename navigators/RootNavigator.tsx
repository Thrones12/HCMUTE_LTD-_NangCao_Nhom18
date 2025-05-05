import AuthNavigator from "@/navigators/AuthNavigator";
import MainNavigator from "@/navigators/MainNavigator";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import AdminNavigator from "./AdminNavigator";
import MainTabNavigator from "./MainTabNavigator";
const RootNavigator = () => {
    const { user } = useContext(AuthContext);

    return user ? <AdminNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
