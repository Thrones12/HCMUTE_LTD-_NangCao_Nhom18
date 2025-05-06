import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ButtonComponent } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";

const CourseListScreen = () => {
    const { Logout } = useContext(AuthContext);
    return (
        <View style={{ marginTop: 50 }}>
            <ButtonComponent text='Logout' onPress={Logout} type='primary' />
        </View>
    );
};

export default CourseListScreen;
