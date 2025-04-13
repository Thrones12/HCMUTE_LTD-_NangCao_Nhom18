import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { Constant } from "@/constants/Constant";
import Notification from "@/services/Notification";

const FavoriteButton = ({ lessonId }: any) => {
    const { user } = useContext(AuthContext);
    const API = Constant.API;
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await axios.get(
                    `${API}/lesson/getOne?id=${lessonId}`
                );
                const lessonData = res.data.data;

                // Kiểm tra user._id trong likes (likes là array các user object)
                const liked = lessonData.likes.some(
                    (user: any) => user._id === user._id
                );

                setIsLiked(liked);
            } catch (error) {
                console.log("Lỗi khi lấy lesson:", error);
            }
        };

        fetchLesson();
    }, [lessonId, user._id]);

    const toggleLike = async () => {
        setIsLiked((prev) => !prev);
        try {
            // Unlike
            if (isLiked === true) {
                await axios.put(`${API}/lesson/unlike`, {
                    lessonId: lessonId,
                    userId: user._id,
                });
            }
            // Like
            else {
                await axios.put(`${API}/lesson/like`, {
                    lessonId: lessonId,
                    userId: user._id,
                });
            }
        } catch (err: any) {
            Notification.error(err.data.message);
        }
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.fab} onPress={toggleLike}>
                <Ionicons
                    name={"heart"}
                    size={24}
                    color={isLiked ? "#E53935" : "#fff"}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: 0,
        right: 20,
        alignItems: "center",
        zIndex: 999,
    },
    fab: {
        backgroundColor: "#BCAAA4",
        width: 30,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
});

export default FavoriteButton;
