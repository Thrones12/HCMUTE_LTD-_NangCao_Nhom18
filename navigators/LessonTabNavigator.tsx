// navigators/BottomTabNavigator.tsx
import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LessonScreen, ExerciseScreen, CommentScreen } from "@/screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Lesson } from "@/services";

const Tab = createBottomTabNavigator();

const LessonTabNavigator = ({ route }: any) => {
    const { lessonId } = route.params;
    const [lesson, setLesson] = useState<any>([]);
    // Fetch bài học bằng lessonId
    useEffect(() => {
        const fetchData = async (lessonId: string) => {
            try {
                const data = await Lesson.GetOne(lessonId);
                setLesson(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học:", error);
            }
        };

        if (lessonId) fetchData(lessonId);
    }, [lessonId]);
    return (
        <Tab.Navigator backBehavior='history' initialRouteName='Lesson'>
            <Tab.Screen
                name='Lesson'
                children={() => <LessonScreen lesson={lesson} />}
            />
            <Tab.Screen
                name='Exercise'
                children={() => <ExerciseScreen lesson={lesson} />}
            />
            <Tab.Screen
                name='Comment'
                children={() => <CommentScreen lesson={lesson} />}
            />
        </Tab.Navigator>
    );
};
export default LessonTabNavigator;
