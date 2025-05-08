import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import TimeFormat from "@/utils/TimeFormat";
const { width: screenWidth } = Dimensions.get("window");
const ExamCard = ({ item, onPress }: any) => {
    function formatNumberVN(number: number): string {
        if (number >= 1_000_000_000)
            return (
                (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "T"
            );
        if (number >= 1_000_000)
            return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "Tr";
        if (number >= 1_000)
            return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "N";
        return number.toString();
    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={onPress}>
                <View
                    style={[
                        styles.main,
                        {
                            backgroundColor:
                                item.level === "Easy"
                                    ? "#E0FCD6"
                                    : item.level === "Medium"
                                    ? "#FFF5CF"
                                    : "#FBE5D8",
                        },
                    ]}
                >
                    <View style={styles.title}>
                        <Text
                            style={styles.mainTitle}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={styles.subTitle}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.courseTitle} - {item.subjectTitle}
                        </Text>
                    </View>
                    <View style={styles.examInfo}>
                        <View style={styles.examInfoItem}>
                            <Text style={styles.examInfoText}>
                                Số lượng câu hỏi:
                            </Text>
                            <Text style={styles.examInfoText}>
                                {item.questions.length} câu
                            </Text>
                        </View>
                        <View style={styles.examInfoItem}>
                            <Text style={styles.examInfoText}>
                                Thời gian làm bài:
                            </Text>
                            <Text style={styles.examInfoText}>
                                {item.duration}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.secondary}>
                    <Text style={styles.time}>
                        {TimeFormat.formatTimeAgo(item.timestamp)}
                    </Text>
                    <View style={[styles.flexEnd, { gap: 5 }]}>
                        <View style={styles.icon}>
                            <Ionicons
                                name='heart'
                                size={14}
                                color={Colors.Red}
                                style={{ marginRight: 2 }}
                            />
                            <Text style={{ color: Colors.Gray700 }}>
                                {formatNumberVN(item.likes.length)}
                            </Text>
                        </View>
                        <View style={styles.icon}>
                            <Ionicons
                                name='bookmark'
                                size={14}
                                color='#FFC94A'
                                style={{ marginRight: 2 }}
                            />
                            <Text style={{ color: Colors.Gray700 }}>
                                {formatNumberVN(item.saves.length)}
                            </Text>
                        </View>
                        <View style={styles.icon}>
                            <Ionicons
                                name='document-text'
                                size={14}
                                color={Colors.Blue700}
                                style={{ marginRight: 2 }}
                            />
                            <Text style={{ color: Colors.Gray700 }}>
                                {formatNumberVN(item.attempCount)}
                            </Text>
                        </View>
                    </View>
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
    title: {},
    mainTitle: { fontSize: 20, fontWeight: 600, color: Colors.Gray800 },
    subTitle: { fontSize: 14, fontWeight: 500, color: Colors.Gray500 },
    examInfo: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 20,
    },
    examInfoItem: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
    },
    examInfoText: { fontSize: 14, fontWeight: 500, color: Colors.Gray700 },
    secondary: {
        padding: 5,
        display: "flex",
        flexDirection: "row",
    },
    time: {
        fontSize: 14,
        fontStyle: "italic",
        color: Colors.Gray600,
    },
    flexEnd: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    icon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: Colors.Gray800,
    },
});

export default ExamCard;
