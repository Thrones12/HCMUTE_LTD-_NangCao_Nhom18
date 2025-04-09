import { Data } from "@/constants";
import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const NotificationScreen = () => {
    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Ionicons name={"notifications"} size={30} />
            <View style={styles.content}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>
                    {new Date(item.time).toLocaleString()}
                </Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={Data.notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    item: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    icon: {
        fontSize: 24,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    message: {
        fontSize: 16,
        color: "#333",
    },
    time: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
});

export default NotificationScreen;
