import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    VerifyScreen,
} from "@/screens";
import { RootStackParamList } from "@/constants/Types";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
            <Stack.Screen name='Verify' component={VerifyScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
