import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/constants";

const CategoryItemComponent = ({ name, icon, navigation }: any) => {
    return (
        <Pressable
            onPress={() =>
                navigation.navigate("LessonList", { courseName: name })
            }
            style={styles.cateItem}
        >
            <Ionicons name={icon} style={styles.icon} size={25}></Ionicons>
            <Text style={styles.text}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cateItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        backgroundColor: "#fff",
        paddingVertical: 10,
    },
    icon: {
        color: Colors.Gray600,
    },
    text: {
        fontSize: 11,
        marginTop: 5,
        color: Colors.Gray600,
    },
});

export default CategoryItemComponent;
