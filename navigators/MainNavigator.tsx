import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import {
    SubjectListScreen,
    LessonListScreen,
    StorageExamScreen,
    NotificationScreen,
    HistoryScreen,
    ExamScreen,
    VerifyScreen,
    SearchScreen,
} from "@/screens";
import LessonTabNavigator from "./LessonTabNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
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
            <Stack.Screen name='Search' component={SearchScreen} />
            <Stack.Screen name='Exam' component={ExamScreen} />

            <Stack.Screen name='Vertify' component={VerifyScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
