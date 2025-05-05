import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ButtonComponent } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";

const CourseListScreen = () => {
    const { logout } = useContext(AuthContext);
    return (
        <View style={{ marginTop: 50 }}>
            <ButtonComponent text='Logout' onPress={logout} type='primary' />
        </View>
    );
};

export default CourseListScreen;