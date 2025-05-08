import { Header } from "@/components";
import { Colors, GStyles } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import Notification from "@/services/Notification";
import TimeFormat from "@/utils/TimeFormat";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const NotificationScreen = () => {
    const { userId } = useContext(AuthContext);
    const [notifications, setNotifications] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch danh sách môn học
    useEffect(() => {
        const fetchData = async (userId: string) => {
            try {
                const data = await Notification.GetAllByUser(userId);
                setNotifications(data);
                await Notification.SetReadedByUser(userId);
            } catch (error) {
                console.error("Lỗi khi lấy môn học:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchData(userId);
    }, [userId]);
    const renderItem = ({ item }: any) => (
        <View
            style={[
                styles.item,
                {
                    backgroundColor:
                        item.isRead === "true" ? Colors.Gray100 : Colors.White,
                },
            ]}
        >
            <Ionicons name={"notifications"} size={25} style={styles.icon} />
            <View style={styles.content}>
                <Text style={styles.message}>{item.content}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.time}>
                        {TimeFormat.formatTimeAgo(item.timestamp)}
                    </Text>
                    {item.isRead === "false" && (
                        <Text style={[styles.time, { fontStyle: "italic" }]}>
                            {"  -  Mới"}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <View style={GStyles.container}>
            <Header title={"Thông báo"} />
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    item: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 2,
        marginBottom: 10,
    },
    icon: {
        marginTop: 5,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    message: {
        fontSize: 16,
        textAlign: "justify",
        color: Colors.Gray800,
    },
    time: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
});

export default NotificationScreen;
