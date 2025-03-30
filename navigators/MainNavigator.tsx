import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
} from "@/screens";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
