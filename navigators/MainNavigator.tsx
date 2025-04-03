import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    ProfileScreen,
} from "@/screens";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Profile'
        >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
