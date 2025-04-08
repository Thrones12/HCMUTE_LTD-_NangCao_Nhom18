import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens";
import TabNavigator from "./TabNavigator";
import LessonListScreen from "@/screens/LessonListScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Main'
        >
            <Stack.Screen name='Main' component={TabNavigator} />
            <Stack.Screen name='LessonList' component={LessonListScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
