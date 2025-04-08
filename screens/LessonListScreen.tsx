import { View, Text } from "react-native";
import React from "react";

const LessonListScreen = ({ route }: any) => {
    const { courseName } = route.params;
    return (
        <View>
            <Text>LessonListScreen</Text>
            <Text>{courseName}</Text>
        </View>
    );
};

export default LessonListScreen;
