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
import AccountScreen from "@/screens/admin/AccountScreen";
import CourseScreen from "@/screens/admin/CourseScreen";

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Course'
        >
            {/* Tab navigator */}
            <Stack.Screen name='Account' component={AccountScreen} />
            <Stack.Screen name='Course' component={CourseScreen} />

            
        </Stack.Navigator>
    );
};

export default AdminNavigator;
