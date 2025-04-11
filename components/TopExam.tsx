// Hiển thị 10 môn học xem nhiều nhất trong trang home
import { Colors } from "@/constants";
import React from "react";
import {
    View,
    Image,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width: screenWidth } = Dimensions.get("window");

const CARD_WIDTH = screenWidth / 2 - 30; // width of 1 card
const GAP = 20; // space between cards
const SNAP_INTERVAL = CARD_WIDTH + GAP;

const TopExam = ({ exams, navigation }: any) => {
    const renderItem = ({ item }: any) => (
        <Pressable
            onPress={() => navigation.navigate("LessonList", { _id: item._id })}
            style={styles.item}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoWrapper}>
                <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                </Text>
                <View style={styles.info}>
                    <View style={styles.subInfo}>
                        <Ionicons
                            name='eye-outline'
                            size={13}
                            color={Colors.Gray600}
                        />
                        <Text style={{ fontSize: 10, color: Colors.Gray600 }}>
                            {item.views}
                        </Text>
                    </View>
                    <View style={styles.subInfo}>
                        <Ionicons
                            name='heart-outline'
                            size={13}
                            color={Colors.Gray600}
                        />
                        <Text style={{ fontSize: 10, color: Colors.Gray600 }}>
                            {item.likes.length}
                        </Text>
                    </View>
                    <View style={styles.subInfo}>
                        <Ionicons
                            name='bookmark-outline'
                            size={13}
                            color={Colors.Gray600}
                        />
                        <Text style={{ fontSize: 10, color: Colors.Gray600 }}>
                            {item.save.length}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        <FlatList
            data={exams}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            snapToAlignment='start'
            decelerationRate='fast'
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    item: {
        backgroundColor: Colors.Gray100,
        borderRadius: 12,
        width: 240,
        height: 80,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
    },
    image: {
        height: "100%",
        width: 80,
        objectFit: "cover",
    },
    infoWrapper: {
        width: 150,
        marginHorizontal: 5,
        marginTop: 5,
    },
    title: {
        fontSize: 16,
        color: Colors.Gray700,
        marginBlock: 5,
    },
    info: { display: "flex", flexDirection: "row", gap: 8 },
    subInfo: { display: "flex", flexDirection: "row", gap: 2 },
    icon: {},
    infoText: {},
});

export default TopExam;
