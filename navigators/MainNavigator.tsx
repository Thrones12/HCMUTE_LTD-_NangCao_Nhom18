import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens";
import TabNavigator from "./TabNavigator";
import {
    SubjectListScreen,
    LessonScreen,
    LessonListScreen,
    StorageExamScreen,
    NotificationScreen,
    HistoryScreen,
} from "@/screens";
import LessonTabNavigator from "./LessonTabNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Main'
        >
            <Stack.Screen name='Main' component={TabNavigator} />
            <Stack.Screen name='SubjectList' component={SubjectListScreen} />
            <Stack.Screen name='LessonList' component={LessonListScreen} />
            <Stack.Screen name='LessonTab' component={LessonTabNavigator} />
            <Stack.Screen name='StorageExam' component={StorageExamScreen} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
            <Stack.Screen name='History' component={HistoryScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
