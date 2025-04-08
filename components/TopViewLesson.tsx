// Hiển thị 10 môn học xem nhiều nhất trong trang home
import { Colors } from "@/constants";
import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width: screenWidth } = Dimensions.get("window");

const products = [
    { id: "1", name: "Vật lý", course: "Lớp 12" },
    { id: "2", name: "Hóa học", course: "Lớp 12" },
    { id: "3", name: "Sinh học", course: "Lớp 12" },
    { id: "4", name: "Toán học", course: "Lớp 12" },
    { id: "5", name: "Địa lí", course: "Lớp 12" },
    { id: "6", name: "Lịch sử", course: "Lớp 12" },
    { id: "7", name: "Ngữ văn", course: "Lớp 12" },
    { id: "8", name: "Tiếng anh", course: "Lớp 12" },
    { id: "9", name: "GDCD", course: "Lớp 12" },
    { id: "10", name: "Công nghệ", course: "Lớp 12" },
];

const CARD_WIDTH = screenWidth / 2 - 30; // width of 1 card
const GAP = 20; // space between cards
const SNAP_INTERVAL = CARD_WIDTH + GAP;

const TopViewLesson = () => {
    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.course}>{item.course}</Text>
            </View>
            <View style={styles.view}>
                <Text style={{ fontSize: 12, color: Colors.Gray600 }}>518</Text>
                <Ionicons name='eye-outline' size={13} color={Colors.Gray600} />
            </View>
        </View>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            snapToAlignment='start'
            decelerationRate='fast'
            contentContainerStyle={styles.sliderContainer}
        />
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginRight: GAP,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
    },
    info: {},
    name: {
        fontSize: 14,
        fontWeight: "500",
    },
    course: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});

export default TopViewLesson;
