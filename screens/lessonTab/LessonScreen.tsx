import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Pressable,
    Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Header, VideoChapterItem, VideoComponent } from "@/components";
import { Colors, GStyles } from "@/constants";
import { Lesson } from "@/services";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

const { width: screenWidth } = Dimensions.get("window");
const LessonScreen = ({ lessonId }: any) => {
    const [lesson, setLesson] = useState<any>();
    const [play, setPlay] = useState<any>();
    const [time, setTime] = useState<any>(0);
    const [times, setTimes] = useState<any>([]);
    // Fetch bài học bằng lessonId
    useEffect(() => {
        const fetchData = async (lessonId: string) => {
            try {
                const data = await Lesson.GetOne(lessonId);
                setLesson(data);
                setTimes(data.chapters.map((chapter: any) => chapter.time));
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học:", error);
            }
        };

        if (lessonId) fetchData(lessonId);
    }, [lessonId]);

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
    const renderItem = ({ item, index }: any) => (
        <VideoChapterItem
            item={item}
            index={index}
            play={play}
            onPress={() => {
                setPlay(index);
            }}
        />
    );
    useEffect(() => {
        if (play !== null) {
            setTime(times[play]);
        }
    }, [play]);
    return (
        <View style={GStyles.container}>
            {lesson && <Header title={lesson.title} />}
            {lesson && (
                <View style={{ flex: 1, padding: 15 }}>
                    {/* Begin: Video */}
                    {lesson && (
                        <VideoComponent
                            videoSource={lesson.videoUrl}
                            times={times}
                            time={time}
                            onTime={setPlay}
                        />
                    )}
                    {/* End: Video */}
                    <View style={styles.title}>
                        <Text style={styles.mainTitle}>{lesson.title}</Text>
                        <View style={styles.subTitle}>
                            <Text style={styles.subText}>
                                {formatNumberVN(lesson.attempCount)} lượt học
                            </Text>
                            {/* Rating */}
                            <View style={styles.icon}>
                                <Ionicons
                                    name='star'
                                    size={17}
                                    color='#FFBE1A'
                                    style={{ marginRight: 2 }}
                                />
                                <Text style={styles.subText}>
                                    {lesson.rating}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={lesson.chapters}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ gap: 20, padding: 10 }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        borderRadius: 15,
        overflow: "hidden",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        width: screenWidth - 30,
        height: ((screenWidth - 30) * 2) / 3,
        borderRadius: 15,
        elevation: 2,
        backgroundColor: "#000",
    },
    title: { flexDirection: "column", marginVertical: 20, gap: 5 },
    mainTitle: { fontSize: 24, fontWeight: 600, color: Colors.Gray800 },
    subTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    subText: { fontSize: 14, color: Colors.Gray500 },
    icon: { flexDirection: "row", alignItems: "center" },
    chapter: {
        backgroundColor: Colors.White,
        padding: 10,
        borderRadius: 15,
        elevation: 2,
    },
    chapterButton: {
        borderRadius: "50%",
        width: 50,
        height: 50,
        marginRight: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
    },
    chapterInfo: { flexDirection: "column", justifyContent: "center" },
    chapterTitle: { fontSize: 16, fontWeight: 600, color: Colors.Gray800 },
    chapterTime: { fontSize: 14, color: Colors.Gray500 },
});

export default LessonScreen;
