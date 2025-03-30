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

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen
                name='ForgetPassword'
                component={ForgetPasswordScreen}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
