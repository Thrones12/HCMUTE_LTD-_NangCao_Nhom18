import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    VertifyScreen,
} from "@/screens";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Login'
        >
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen
                name='ForgetPassword'
                component={ForgetPasswordScreen}
            />
            <Stack.Screen name='Vertify' component={VertifyScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
