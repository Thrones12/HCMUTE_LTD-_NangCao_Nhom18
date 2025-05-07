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
import Notification from "@/services/Notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { AuthContext } from "@/contexts/AuthContext";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const CommentScreen = ({ lesson }: any) => {
    const API = Constant.API;
    const { user, logout } = useContext(AuthContext);
    const [data, setData] = useState<any>({});
    const [commentText, setCommentText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        console.log(lesson);
    }, [lesson]);

    const sortCommentsByTime = (comments: any[]) => {
        return comments.sort(
            (a, b) =>
                new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
    };

    const handleSubmitComment = async () => {
        if (!commentText.trim()) {
            Notification.info("Bạn cần nhập nội dung bình luận");
            return;
        }

        setSubmitting(true);
        try {
            const res = await axios.post(`${API}/comment`, {
                lessonId: lesson._id,
                userId: user._id,
                content: commentText,
            });

            const newComment = res.data.data;

            setData((prev: any) => ({
                ...prev,
                comments: sortCommentsByTime([...prev.comments, newComment]),
            }));

            setCommentText("");
            Notification.success("Bình luận thành công");
        } catch (err: any) {
            Notification.error("Không thể gửi bình luận");
        } finally {
            setSubmitting(false);
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.commentItem}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
                <Text style={styles.userName}>{item.user.fullname}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <Text style={styles.time}>
                    {dayjs(item.createAt).fromNow()}
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
            <View style={styles.container}>
                <FlatList
                    data={data.comments}
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
