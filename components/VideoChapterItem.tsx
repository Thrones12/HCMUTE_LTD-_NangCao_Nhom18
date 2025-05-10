import { View, Text, Animated, Pressable, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import TimeFormat from "@/utils/TimeFormat";

const VideoChapterItem = ({ item, index, play, onPress }: any) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            style={[
                styles.chapter,
                {
                    backgroundColor:
                        play === index ? Colors.Blue100 : Colors.White,
                },
            ]}
            onPress={() => onPress(index)}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    transform: [{ scale }],
                }}
            >
                <View
                    style={[
                        styles.chapterButton,
                        {
                            backgroundColor:
                                play === index ? Colors.Blue500 : Colors.White,
                        },
                    ]}
                >
                    <Ionicons
                        name='play'
                        size={30}
                        color={play === index ? Colors.White : Colors.Blue500}
                        style={{ left: 2 }}
                    />
                </View>
                <View style={styles.chapterInfo}>
                    <Text
                        style={[
                            styles.chapterTitle,
                            {
                                color:
                                    play === index
                                        ? Colors.Blue500
                                        : Colors.Gray800,
                            },
                        ]}
                    >
                        {item.title}
                    </Text>
                    <Text style={styles.chapterTime}>
                        {TimeFormat.formatChapterTime(item.time)} phút
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
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
export default VideoChapterItem;
