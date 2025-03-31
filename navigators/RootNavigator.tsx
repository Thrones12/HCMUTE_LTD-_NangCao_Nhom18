import AuthNavigator from "@/navigators/AuthNavigator";
import MainNavigator from "@/navigators/MainNavigator";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const RootNavigator = () => {
    const { user } = useContext(AuthContext);

    return user ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
