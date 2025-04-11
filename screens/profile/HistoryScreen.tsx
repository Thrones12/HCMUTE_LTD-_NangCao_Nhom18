import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Data } from "@/constants";

const { width: screenWidth } = Dimensions.get("window");
const iconMap: any = {
    comment: "chatbubble-ellipses-outline",
    test: "document-text-outline",
    favorite: "heart-outline",
};
const HistoryScreen = () => {
    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <View style={styles.timeColumn}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.contentColumn}>
                <View style={styles.activityBox}>
                    <Ionicons
                        name={iconMap[item.type]}
                        size={20}
                        color='#4a90e2'
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.content}>{item.content}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            data={Data.activities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: "#f7f7f7",
        flex: 1,
    },
    row: {
        flexDirection: "row",
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    timeColumn: {
        width: screenWidth / 6,
        alignItems: "center",
        justifyContent: "center",
    },
    date: {
        fontSize: 12,
        color: "#888",
    },
    time: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#444",
    },
    contentColumn: {
        flex: 1,
        justifyContent: "center",
    },
    activityBox: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    content: {
        fontSize: 14,
        color: "#333",
        flexShrink: 1,
    },
});
export default HistoryScreen;
