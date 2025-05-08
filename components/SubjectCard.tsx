import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const { width: screenWidth } = Dimensions.get("window");
const Color = [
    "#E0FCD6",
    "#FFF5CF",
    "#FBE5D8",
    "#FFE3ED",
    "#D5F2FF",
    "#DDF5D1",
    "#E8E6FA",
    "#D6EAF8",
    "#FFE7C7",
    "#FDDCDC",
];
const SubjectCard = ({ index, item, onPress }: any) => {
    const backgroundColor = Color[index % Color.length];
    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={onPress}>
                <View style={[styles.main, { backgroundColor }]}>
                    <Text style={styles.mainTitle}>{item.title}</Text>
                    <Text style={styles.subTitle}>
                        {item.lessons.length} bài học
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    item: {
        backgroundColor: Colors.White,
        padding: 5,
        borderRadius: 10,
        elevation: 2,
    },
    main: { padding: 15, borderRadius: 5 },
    mainTitle: { fontSize: 20, fontWeight: 600, color: Colors.Gray800 },
    subTitle: { fontSize: 14, fontWeight: 500, color: Colors.Gray500 },
});

export default SubjectCard;
