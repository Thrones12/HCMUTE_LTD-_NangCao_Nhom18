import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const CourseCard = ({ item, onPress }: any) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text>{item.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginBottom: 10,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
});

export default CourseCard;
