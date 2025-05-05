import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GStyles } from "@/constants";

const CourseDetailScreen = ({ route, navigation }: any) => {
    const { course } = route.params;

    return (
        <View style={GStyles.container}>
            <Text style={styles.title}>{course.title}</Text>

            <Text style={styles.info}>
                Số môn học: {course.subjects?.length || 0}
            </Text>

            {/* Bạn có thể lặp qua subjects để hiển thị thêm chi tiết */}
            {course.subjects?.map((subject: any, index: number) => (
                <View key={index} style={styles.subjectBox}>
                    <Text style={styles.subjectTitle}>{subject.title}</Text>
                    <Text style={styles.lessonCount}>
                        Số chương: {subject.chapters?.length || 0}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 12,
    },
    subjectBox: {
        padding: 10,
        marginVertical: 6,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
    },
    subjectTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    lessonCount: {
        fontSize: 14,
        color: "#555",
    },
});

export default CourseDetailScreen;