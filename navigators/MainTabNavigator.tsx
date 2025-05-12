// navigators/BottomTabNavigator.tsx
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    HomeScreen,
    ProfileScreen,
    CourseListScreen,
    ExamListScreen,
} from "@/screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/constants";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior='history'
            screenOptions={({ route }: any) => ({
                headerShown: false,
                animation: "shift",
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = "home-outline";
                    } else if (route.name === "CourseList") {
                        iconName = "book-outline";
                    } else if (route.name === "ExamList") {
                        iconName = "clipboard-outline";
                    } else {
                        iconName = "person-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='CourseList' component={CourseListScreen} />
            <Tab.Screen name='ExamList' component={ExamListScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
};
export default MainTabNavigator;
