import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GStyles, Colors } from "@/constants";
import Notification from "@/services/Notification";
import axios from "axios";
import { Constant } from "@/constants/Constant";
import { Ionicons } from "@expo/vector-icons";

const PAGE_SIZE = 10;
const LessonListScreen = ({ navigation, route }: any) => {
    const { title, lessons } = route.params;
    const API = Constant.API;

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const loadData = () => {
        if (loading || allLoaded) return;

        setLoading(true);
        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const newData = lessons.slice(start, end);

            setData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (end >= lessons.length) {
                setAllLoaded(true);
            }
        }, 1000);
    };
    const renderItem = ({ item }: any) => (
        <View style={styles.itemWrapper}>
            <Pressable
                onPress={() =>
                    navigation.navigate("LessonTab", { lesson: item })
                }
                style={styles.item}
            >
                <View style={styles.video}></View>
                <View style={styles.content}>
                    <Text numberOfLines={2} style={styles.title}>
                        {item.title}
                    </Text>
                    <View style={styles.subInfo}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoText}>{item.views}</Text>
                            <Ionicons
                                name='eye-outline'
                                size={14}
                                color={Colors.Gray600}
                                style={{ marginTop: 1.5 }}
                            />
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoText}>
                                {item.likes.length}
                            </Text>
                            <Ionicons
                                name='heart-outline'
                                size={14}
                                color={Colors.Gray600}
                                style={{ marginTop: 1.5 }}
                            />
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoText}>
                                {item.comments.length}
                            </Text>
                            <Ionicons
                                name='chatbubble-outline'
                                size={13}
                                color={Colors.Gray600}
                                style={{ marginTop: 1 }}
                            />
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
    useEffect(() => {
        loadData();
    }, [lessons]);
    return (
        <View style={GStyles.container}>
            <View
                style={{
                    flexGrow: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                    backgroundColor: Colors.white,
                }}
            >
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                    ListHeaderComponent={
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: 600,
                                height: 30,
                                margin: 10,
                            }}
                        >
                            {title}
                        </Text>
                    }
                    onEndReached={loadData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading && !allLoaded ? (
                            <View style={{ padding: 10 }}>
                                <ActivityIndicator size='small' color='#888' />
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: "transparent",
        padding: 8,
    },
    item: {
        backgroundColor: Colors.Gray100,
        borderRadius: 10,
        elevation: 2,
        minHeight: 95,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
    },
    video: {
        backgroundColor: Colors.Sky,
        flex: 3,
    },
    content: {
        backgroundColor: Colors.white,
        flex: 5,
        padding: 8,
        display: "flex",
        flexDirection: "column",
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 600,
    },
    subInfo: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    infoItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    infoText: { color: Colors.Gray600 },
});
export default LessonListScreen;
