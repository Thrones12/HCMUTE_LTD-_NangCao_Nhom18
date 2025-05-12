// navigators/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LessonScreen, ExerciseScreen, CommentScreen } from "@/screens";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const LessonTabNavigator = ({ route }: any) => {
    const { lessonId } = route.params;
    return (
        <Tab.Navigator
            backBehavior='history'
            initialRouteName='Lesson'
            screenOptions={({ route }: any) => ({
                headerShown: false,
                animation: "shift",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons
                            name={
                                route.name === "Lesson"
                                    ? "play-circle-outline"
                                    : route.name === "Exercise"
                                    ? "create-outline"
                                    : "chatbubble-outline"
                            }
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name='Lesson'
                children={() => <LessonScreen lessonId={lessonId} />}
            />
            <Tab.Screen
                name='Exercise'
                children={() => <ExerciseScreen lessonId={lessonId} />}
            />
            <Tab.Screen
                name='Comment'
                children={() => <CommentScreen lessonId={lessonId} />}
            />
        </Tab.Navigator>
    );
};
export default LessonTabNavigator;
