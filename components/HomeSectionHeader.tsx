import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { AuthContext } from "@/contexts/AuthContext";
import Notification from "@/services/Notification";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const HomeSectionHeader = () => {
    const { userId } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp>();
    const [hasNotification, setHasNotification] = useState(false);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const fetchData = async (userId: string) => {
            try {
                const data = await Notification.GetAllByUser(userId);
                setHasNotification(
                    data.some((noti: any) => noti.isRead === "false")
                );
            } catch (error) {
                console.error("Lỗi khi lấy môn học:", error);
            }
        };

        if (userId) fetchData(userId);
    }, [userId]);
    useEffect(() => {
        setHasNotification(false);
    }, [reload]);
    return (
        <View style={[styles.container]}>
            {/* Xin chào và Notification */}
            <View style={styles.flexRow}>
                <View>
                    <Text style={styles.textPrimary}>Chào Phong!</Text>
                    <Text style={styles.textSecondary}>
                        Hôm nay bạn muốn học gì nào?
                    </Text>
                </View>
                <Pressable
                    style={styles.notification}
                    onPress={() => {
                        setReload(!reload);
                        navigation.navigate("Notification");
                    }}
                >
                    <Ionicons
                        name='notifications-outline'
                        size={28}
                        color='black'
                    />
                    {hasNotification && <View style={styles.badge} />}
                </Pressable>
            </View>
            {/* Search */}
            <Pressable
                style={styles.searchWrapper}
                onPress={() => navigation.navigate("Search")}
            >
                <Ionicons
                    name='search'
                    size={26}
                    color={Colors.Gray500}
                    style={styles.icon}
                />
                <Text style={styles.input}>Tìm kiếm ...</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 15,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textPrimary: {
        fontSize: 22,
        fontWeight: 600,
        color: Colors.Gray800,
    },
    textSecondary: {
        fontSize: 15,
        fontWeight: 500,
        color: Colors.Gray500,
    },
    notification: {
        padding: 8,
        backgroundColor: Colors.White,
        borderRadius: 15,
        elevation: 2,
    },
    badge: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#C62828",
    },
    // Search
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.White,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        elevation: 2,
    },
    icon: {
        marginRight: 7,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.Gray500,
        paddingVertical: 13,
    },
});

export default HomeSectionHeader;
