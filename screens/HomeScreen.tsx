import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { GStyles } from "@/constants";

const HomeScreen = ({ navigation }: any) => {
    const { user, logout } = useContext(AuthContext);
    return (
        <View style={GStyles.container}>
            <Text>HomeScreen</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
