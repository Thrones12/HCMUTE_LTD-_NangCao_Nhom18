// Hiển thị các slide trên cùng của trang home
import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";

const { width: screenWidth } = Dimensions.get("window");

const data = [
    { id: "1", title: "Khóa học HTML" },
    { id: "2", title: "Khóa học CSS" },
    { id: "3", title: "Khóa học JavaScript" },
];
const SlideShow = () => {
    const renderItem = ({ item }: any) => (
        <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContainer}
        />
    );
};
const styles = StyleSheet.create({
    sliderContainer: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
    slide: {
        width: screenWidth - 40, // Slide chiếm gần full width
        height: 210,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 10,
        position: "relative",
        left: -10,
    },
});

export default SlideShow;
