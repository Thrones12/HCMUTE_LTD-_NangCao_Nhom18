import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { DocumentComponent, Header, QuestionCard } from "@/components";
import { Lesson } from "@/services";
import { GStyles } from "@/constants";

const { width: screenWidth } = Dimensions.get("window");
const ExerciseScreen = ({ lessonId }: any) => {
    const [lesson, setLesson] = useState<any>();
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
    const renderItem = ({ item, index }: any) => (
        <QuestionCard item={item} index={index + 1} />
    );
    return (
        <View style={GStyles.container}>
            {lesson && <Header title={lesson.title} />}
            {lesson && (
                <FlatList
                    data={lesson.questions}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ marginTop: 20 }}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    documentContainer: {
        marginTop: 30,
        width: screenWidth,
        flex: 1,
    },
});

export default ExerciseScreen;
