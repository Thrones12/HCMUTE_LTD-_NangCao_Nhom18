// navigators/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LessonScreen, ExerciseScreen, CommentScreen } from "@/screens";

const Tab = createBottomTabNavigator();

const LessonTabNavigator = ({ route }: any) => {
    const { lessonId } = route.params;
    return (
        <Tab.Navigator
            backBehavior='history'
            initialRouteName='Lesson'
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
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
