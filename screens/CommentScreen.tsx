import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { Data } from "@/constants";

const CommentScreen = ({ _id }: any) => {
    // Giả lập dữ liệu

    const renderItem = ({ item }: any) => (
        <View style={styles.commentItem}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <Text style={styles.time}>
                    {new Date(item.createdAt).toLocaleString()}
                </Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={Data.comments}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        marginTop: 30,
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
});

export default CommentScreen;
