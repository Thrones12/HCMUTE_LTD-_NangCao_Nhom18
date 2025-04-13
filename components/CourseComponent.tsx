import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/constants";

const CourseComponent = ({ courses, navigation }: any) => {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        setData(courses);
    }, [courses]);
    const renderItem = ({ item }: any) => (
        <Pressable
            onPress={() =>
                navigation.navigate("SubjectList", {
                    _id: item._id,
                    courseTitle: item.title,
                })
            }
            style={styles.cateItem}
        >
            <Ionicons
                name={"home-outline"}
                style={styles.icon}
                size={25}
            ></Ionicons>
            <Text style={styles.text}>{item.title}</Text>
        </Pressable>
    );
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={{}}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-between" }} // nếu muốn dàn đều
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    cateItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
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

export default CourseComponent;
