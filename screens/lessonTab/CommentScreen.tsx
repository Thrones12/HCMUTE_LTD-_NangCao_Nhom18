import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Constant } from "@/constants/Constant";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { AuthContext } from "@/contexts/AuthContext";
import Noti from "@/utils/Noti";
import { Comment, Lesson } from "@/services";
import { Header } from "@/components";
import { GStyles } from "@/constants";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const CommentScreen = ({ lessonId }: any) => {
    const API = Constant.API;
    const { userId, logout } = useContext(AuthContext);
    const [lesson, setLesson] = useState<any>();
    const [comments, setComments] = useState<any>({});
    const [commentText, setCommentText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Fetch bình luận bằng lessonId
    useEffect(() => {
        const fetchData = async (lessonId: string) => {
            try {
                const data = await Comment.GetAllByLesson(lessonId);
                setComments(sortCommentsByTime(data));
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bình luận:", error);
            }
        };

        if (lessonId) fetchData(lessonId);
    }, [lessonId]);
    // Fetch bài học
    useEffect(() => {
        const fetchData = async (lessonId: string) => {
            try {
                const data = await Lesson.GetOne(lessonId);
                setLesson(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bình luận:", error);
            }
        };

        if (lessonId) fetchData(lessonId);
    }, [lessonId]);

    const sortCommentsByTime = (comments: any[]) => {
        return comments.sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        );
    };

    const handleSubmitComment = async () => {
        if (!commentText.trim()) {
            Noti.info("Bạn cần nhập nội dung bình luận");
            return;
        }

        setSubmitting(true);
        try {
            const res = await axios.post(`${API}/comment`, {
                lessonId: lesson._id,
                user: userId,
                content: commentText,
                replyTo: null,
            });

            const newComment = res.data.data;

            setComments((prev: any) =>
                sortCommentsByTime([...comments, newComment])
            );

            setCommentText("");
            Noti.success("Bình luận thành công");
        } catch (err: any) {
            Noti.error("Không thể gửi bình luận");
        } finally {
            setSubmitting(false);
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.commentItem}>
            <Image
                source={
                    item.user.avatar && item.user.avatar.trim() !== ""
                        ? { uri: item.user.avatar }
                        : require("../../assets/images/react-logo.png")
                }
                style={styles.avatar}
            />
            <View style={styles.commentContent}>
                <Text style={styles.userName}>{item.user.fullname}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <Text style={styles.time}>
                    {dayjs(item.timestamp).fromNow()}
                </Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <View style={GStyles.container}>
                {lesson && <Header title={lesson.title} />}
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập bình luận...'
                        value={commentText}
                        onChangeText={setCommentText}
                        multiline
                    />
                    <Pressable
                        style={styles.sendButton}
                        onPress={handleSubmitComment}
                        disabled={submitting}
                    >
                        <Text style={styles.sendButtonText}>
                            {submitting ? "..." : "Gửi"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    userName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    commentText: {
        fontSize: 14,
        marginTop: 4,
    },
    time: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
    inputContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        maxHeight: 100,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: "#1b84ff",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CommentScreen;
