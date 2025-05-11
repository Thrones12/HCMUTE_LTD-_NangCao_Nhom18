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
import React, { useEffect, useState, useContext, useRef } from "react";
import { Constant } from "@/constants/Constant";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { AuthContext } from "@/contexts/AuthContext";
import Noti from "@/utils/Noti";
import { Comment, Lesson } from "@/services";
import { Header } from "@/components";
import { Colors, GStyles } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import TimeFormat from "@/utils/TimeFormat";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const CommentScreen = ({ lessonId }: any) => {
    const API = Constant.API;
    const [reload, setReload] = useState<any>(false);
    const { userId } = useContext(AuthContext);
    const [lesson, setLesson] = useState<any>();
    const [comments, setComments] = useState<any>({});
    const inputRef = useRef<TextInput>(null);
    const [commentText, setCommentText] = useState("");
    const [replyTo, setReplyTo] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [expandedComments, setExpandedComments] = useState<string[]>([]);
    const toggleReplies = (commentId: string) => {
        setExpandedComments((prev) =>
            prev.includes(commentId)
                ? prev.filter((id) => id !== commentId)
                : [...prev, commentId]
        );
    };
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

        if (lesson) fetchData(lessonId);
    }, [lesson, reload]);
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
    }, [lessonId, reload]);

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
            const data = await Comment.Create({
                lessonId,
                user: userId,
                content: commentText,
                replyTo: replyTo.comment._id,
            });
            setReload(!reload);
            setReplyTo(null);

            setCommentText("");
            Noti.success("Bình luận thành công");
        } catch (err: any) {
            Noti.error("Không thể gửi bình luận");
        } finally {
            setSubmitting(false);
        }
    };
    const handleLike = async (comment: any) => {
        if (comment.likes.find((like: any) => like === userId)) {
            await Comment.Unlike(comment._id, userId);
        } else {
            await Comment.Like(comment._id, userId);
        }
        const data = await Lesson.GetOne(lessonId);
        setLesson(data);
    };
    const handleReply = (comment: any, username: any) => {
        inputRef.current?.focus();
        setCommentText(`@${username} `);
        setReplyTo({ comment, username });
    };
    const renderItem = ({ item }: any) => {
        const isExpanded = expandedComments.includes(item._id);
        const hasReplies = item.replies && item.replies.length > 0;
        return (
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
                    <View style={styles.actionRow}>
                        <Text style={styles.userName}>
                            @{item.user.fullname}
                        </Text>
                        <Text style={styles.time}>
                            {TimeFormat.formatTimeAgo(item.timestamp)}
                        </Text>
                    </View>
                    <Text style={styles.commentText}>{item.content}</Text>
                    {/* Like và phản hổi */}
                    <View style={styles.actionRow}>
                        <Pressable
                            onPress={() => handleLike(item)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                top: 2,
                                gap: 5,
                            }}
                        >
                            <Ionicons
                                name={
                                    item.likes.find(
                                        (like: any) => like === userId
                                    )
                                        ? "heart"
                                        : "heart-outline"
                                }
                                size={16}
                                color={Colors.Red}
                            />
                            <Text>{item.likes.length}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                handleReply(item, item.user.fullname)
                            }
                        >
                            <Text style={styles.commentText}>Phản hồi</Text>
                        </Pressable>
                    </View>

                    {/* Xem thêm nếu có reply */}
                    {hasReplies && (
                        <Text
                            style={styles.seeMore}
                            onPress={() => toggleReplies(item._id)}
                        >
                            {isExpanded
                                ? "Ẩn trả lời"
                                : `${item.replies.length} phản hồi`}
                        </Text>
                    )}

                    {/* Danh sách reply nếu đang mở */}
                    {isExpanded &&
                        item.replies.map((reply: any) => (
                            <View key={reply._id} style={styles.commentItem}>
                                <Image
                                    source={
                                        reply.user.avatar &&
                                        reply.user.avatar.trim() !== ""
                                            ? { uri: reply.user.avatar }
                                            : require("../../assets/images/react-logo.png")
                                    }
                                    style={styles.avatar}
                                />
                                <View style={styles.commentContent}>
                                    <View style={styles.actionRow}>
                                        <Text style={styles.userName}>
                                            @{reply.user.fullname}
                                        </Text>
                                        <Text style={styles.time}>
                                            {TimeFormat.formatTimeAgo(
                                                reply.timestamp
                                            )}
                                        </Text>
                                    </View>
                                    <Text style={styles.commentText}>
                                        {reply.content}
                                    </Text>
                                    {/* Like và phản hổi */}
                                    <View style={styles.actionRow}>
                                        <Pressable
                                            onPress={() => handleLike(item._id)}
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                top: 2,
                                                gap: 5,
                                            }}
                                        >
                                            <Ionicons
                                                name={"heart-outline"}
                                                size={16}
                                                color={Colors.Red}
                                            />
                                            <Text>{reply.likes.length}</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() =>
                                                handleReply(
                                                    item,
                                                    reply.user.fullname
                                                )
                                            }
                                        >
                                            <Text style={styles.commentText}>
                                                Phản hồi
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        ))}
                </View>
            </View>
        );
    };
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
                    contentContainerStyle={{ padding: 15, paddingBottom: 80 }}
                />
                <View style={styles.inputContainer}>
                    {replyTo && (
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: 5,
                            }}
                        >
                            <Text>Đang phản hồi @{replyTo.username}</Text>
                            <Pressable
                                style={{ marginLeft: 5 }}
                                onPress={() => setReplyTo(null)}
                            >
                                <Text
                                    style={{
                                        color: Colors.Gray700,
                                        fontStyle: "italic",
                                        fontWeight: 600,
                                    }}
                                >
                                    - Hủy
                                </Text>
                            </Pressable>
                        </View>
                    )}
                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            ref={inputRef}
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
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    commentItem: { flexDirection: "row", marginBottom: 5 },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    commentContent: { flex: 1 },
    userName: { fontWeight: "bold", fontSize: 16 },
    commentText: { fontSize: 14, marginTop: 4 },
    time: { fontSize: 12, color: "#888", marginTop: 4 },
    inputContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "column",
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
    sendButtonText: { color: "#fff", fontWeight: "bold" },
    seeMore: {
        color: "#007bff",
        marginTop: 4,
        fontWeight: "500",
        marginBottom: 10,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
});

export default CommentScreen;
