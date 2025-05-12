import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Data, GStyles } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/services";
import TimeFormat from "@/utils/TimeFormat";
import { Header } from "@/components";

const iconMap: any = {
    comment: "chatbubble-ellipses-outline",
    test: "document-text-outline",
    favorite: "heart-outline",
};
const HistoryScreen = () => {
    const { userId } = useContext(AuthContext);

    const [activities, setActivities] = useState<any>([]);
    useEffect(() => {
        const fetchData = async (userId: string) => {
            const user = await User.GetOne(userId);
            setActivities(
                [...user.histories].sort(
                    (a: any, b: any) =>
                        new Date(b.timestamp).getTime() -
                        new Date(a.timestamp).getTime()
                )
            );
        };
        if (userId) fetchData(userId);
    }, [userId]);
    return (
        <View style={GStyles.container}>
            <Header title='Lịch sử hoạt động' />
            {activities.length === 0 ? (
                <Text>Chưa có hoạt động nào.</Text>
            ) : (
                <FlatList
                    data={activities}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.action}>{item.action}</Text>
                            <Text style={styles.timestamp}>
                                {TimeFormat.formatTimeAgo(item.timestamp)}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{ padding: 15 }}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
    item: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
    },
    action: { fontSize: 16 },
    timestamp: { fontSize: 12, color: "#888" },
});
export default HistoryScreen;
