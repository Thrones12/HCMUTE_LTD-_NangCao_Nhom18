// Hiển thị các slide trên cùng của trang home
import {
    View,
    Text,
    Dimensions,
    FlatList,
    StyleSheet,
    Image,
} from "react-native";
import React from "react";
import { Colors } from "@/constants";

const { width: screenWidth } = Dimensions.get("window");

const BannerSlideShow = ({ data }: any) => {
    const renderItem = ({ item }: any) => (
        <View style={styles.slide}>
            <Image
                source={{ uri: item.pictureUrl }}
                style={styles.image}
                defaultSource={require("@/assets/images/default-banner.png")} // ảnh mặc định
            />
        </View>
    );
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        />
    );
};
const styles = StyleSheet.create({
    container: {},
    slide: {
        width: screenWidth,
        height: (screenWidth * 2) / 3,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        resizeMode: "stretch",
        elevation: 2,
    },
});

export default BannerSlideShow;
