import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens";
import MainTabNavigator from "./MainTabNavigator";

import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "@/screens/mainTab/ProfileScreen";
import EditProfileScreen from "@/screens/profile/EditProfileScreen";

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
            {/* Tab navigator */}
            <Stack.Screen name='Main' component={MainTabNavigator} />
            <Stack.Screen name='LessonTab' component={LessonTabNavigator} />
            {/* Profile screen */}
            <Stack.Screen name='StorageExam' component={StorageExamScreen} />
            <Stack.Screen name='History' component={HistoryScreen} />

            <Stack.Screen name='SubjectList' component={SubjectListScreen} />
            <Stack.Screen name='LessonList' component={LessonListScreen} />
            <Stack.Screen name='Notification' component={NotificationScreen} />

            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
