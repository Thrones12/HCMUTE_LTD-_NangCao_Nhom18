import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Ionicons } from "@expo/vector-icons";
const { width: screenWidth } = Dimensions.get("window");
const LessonCard = ({ customWidth, item, onPress }: any) => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    // Tạo thumbnail
    useEffect(() => {
        const generateThumbnail = async () => {
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    item.videoUrl,
                    {
                        time: 0, // Lấy thumbnail tại giây thứ 1
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
        <View
            style={[
                styles.container,
                {
                    width: customWidth ? customWidth : screenWidth,
                    paddingVertical: customWidth ? 0 : 10,
                    paddingHorizontal: customWidth ? 0 : 15,
                    paddingRight: 15,
                },
            ]}
        >
            {thumbnail && (
                <Pressable
                    style={[
                        styles.item,
                        {
                            padding: customWidth ? 10 : 15,
                        },
                    ]}
                    onPress={onPress}
                >
                    {/* Image */}
                    <Image
                        source={{ uri: thumbnail }}
                        style={[
                            styles.thumbnail,
                            {
                                height: customWidth
                                    ? 180
                                    : ((screenWidth - 60) * 2) / 3,
                            },
                        ]}
                    />
                    {/* Info */}
                    <View style={styles.info}>
                        <Text
                            style={styles.titlePrimary}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {item.title}
                        </Text>
                        <Text style={styles.titleSecondary} numberOfLines={1}>
                            {item.courseTitle} - {item.subjectTitle}
                        </Text>
                    </View>
                    {/* Sub Info */}
                    <View style={styles.flexRow}>
                        {/* Lượt học */}
                        <View style={styles.icon}>
                            <Text
                                style={{ fontSize: 14, color: Colors.Gray600 }}
                            >
                                {formatNumberVN(item.attempCount)} lượt học
                            </Text>
                        </View>
                        {/* Rating */}
                        <View style={styles.icon}>
                            <Ionicons
                                name='star'
                                size={16}
                                color='#FFBE1A'
                                style={{ marginRight: 2 }}
                            />
                            <Text
                                style={{ fontSize: 14, color: Colors.Gray600 }}
                            >
                                {item.rating.length > 0
                                    ? (
                                          item.rating.reduce(
                                              (total: number, item: any) =>
                                                  total + item.rate,
                                              0
                                          ) / item.rating.length
                                      ).toFixed(1) // Làm tròn 1 chữ số thập phân
                                    : "Chưa có đánh giá"}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    item: {
        position: "relative",
        backgroundColor: Colors.White,
        borderRadius: 15,
        elevation: 2,
    },
    thumbnail: {
        borderRadius: 10,
        width: "100%",
        height: 200,
    },
    info: { marginVertical: 10, height: 54 },
    titlePrimary: {
        textAlign: "justify",
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 20,
        color: Colors.Gray800,
    },
    titleSecondary: {
        fontSize: 12,
        fontWeight: 500,
        color: Colors.Gray500,
    },
    icon: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default LessonCard;
