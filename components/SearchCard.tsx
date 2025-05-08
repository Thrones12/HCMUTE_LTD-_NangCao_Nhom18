import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import * as VideoThumbnails from "expo-video-thumbnails";

const SearchCard = ({ item }: any) => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    // Tạo thumbnail
    useEffect(() => {
        const generateThumbnail = async () => {
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    item.videoUrl,
                    {
                        time: 1000, // Lấy thumbnail tại giây thứ 1
                    }
                );
                setThumbnail(uri);
            } catch (e) {
                console.warn(e);
            }
        };
        if (item && item.videoUrl) {
            generateThumbnail(); // Lấy thumbnail
        }
        // Cleanup khi component unmount
        return () => {
            setThumbnail(null);
        };
    }, [item]);
    function formatNumberVN(number: number): string {
        if (number >= 1_000_000_000)
            return (
                (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "T"
            );
        if (number >= 1_000_000)
            return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "Tr";
        if (number >= 1_000)
            return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "N";
        return number.toString();
    }
    return (
        <View>
            {thumbnail && (
                <Pressable style={styles.item}>
                    <Image style={styles.image} source={{ uri: thumbnail }} />
                    <View style={styles.infoWrapper}>
                        <View style={styles.title}>
                            <Text
                                style={styles.mainTitle}
                                numberOfLines={2}
                                ellipsizeMode='tail'
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={styles.subTitle}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                {item.courseTitle} - {item.subjectTitle}
                            </Text>
                        </View>
                        <View style={styles.moreInfo}>
                            {/* Rating */}
                            <View style={styles.icon}>
                                <Ionicons
                                    name='star'
                                    size={13}
                                    color='#FFBE1A'
                                    style={{ marginRight: 2 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: Colors.Gray600,
                                    }}
                                >
                                    {item.rating}
                                </Text>
                            </View>
                            {/* Lượt học */}
                            <View style={styles.icon}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: Colors.Gray600,
                                    }}
                                >
                                    {"  -  "}
                                    {formatNumberVN(2614)} lượt học
                                </Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // Item
    item: {
        backgroundColor: Colors.White,
        borderRadius: 15,
        padding: 10,
        marginBottom: 8,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        elevation: 2,
    },
    image: {
        height: "100%",
        width: 120,
        borderRadius: 10,
    },
    infoWrapper: { flex: 1 },
    title: { flex: 1, height: 70 },
    mainTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: Colors.Gray800,
        lineHeight: 20,
        textAlign: "justify",
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 16,
        color: Colors.Gray600,
    },
    moreInfo: { flexDirection: "row" },
    icon: { flexDirection: "row", alignItems: "center" },
});

export default SearchCard;
