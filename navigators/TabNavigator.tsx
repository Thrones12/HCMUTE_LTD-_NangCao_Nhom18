// navigators/BottomTabNavigator.tsx
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    HomeScreen,
    ProfileScreen,
    CourseListScreen,
    PracticeScreen,
    CameraScreen,
} from "@/screens";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior='history'
            screenOptions={({ route }: any) => ({
                headerShown: false,
                animation: "shift",
                tabBarItemStyle: {
                    backgroundColor: "#fff",
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = "home-outline";
                    } else if (route.name === "Course") {
                        iconName = "book-outline";
                    } else if (route.name === "Practice") {
                        iconName = "create-outline";
                    } else if (route.name === "Profile") {
                        iconName = "person-outline";
                    } else {
                        iconName = "camera-outline";
                    }

                    // 👉 Custom riêng icon Camera
                    if (route.name === "Camera") {
                        return (
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                    backgroundColor: "#1b84ff",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={28}
                                    color='#fff'
                                />
                            </View>
                        );
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='CourseList' component={CourseListScreen} />
            <Tab.Screen
                name='Camera'
                options={{
                    tabBarLabel: () => null, // Ẩn hoàn toàn label
                }}
                component={CameraScreen}
            />
            <Tab.Screen name='Practice' component={PracticeScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
};
export default TabNavigator;
