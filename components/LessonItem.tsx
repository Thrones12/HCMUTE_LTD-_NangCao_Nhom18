import { View, Text, StyleSheet } from "react-native";
import React from "react";

const LessonItem = ({ item }: any) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
        height: 80,
    },
    course: {
        fontSize: 14,
        color: "#666",
    },
    cateView: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
});
export default LessonItem;
