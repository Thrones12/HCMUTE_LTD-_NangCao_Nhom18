import AuthNavigator from "@/navigators/AuthNavigator";
import MainNavigator from "@/navigators/MainNavigator";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const RootNavigator = () => {
    const { userId } = useContext(AuthContext);

    return userId ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
