import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Lesson } from "@/services";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const HomeSectionLesson = () => {
    const navigation = useNavigation<NavigationProp>();
    const [lessons, setLessons] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch danh sách khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Lesson.GetTopLesson();
                setLessons(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học nổi bật:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Render item của flatlist
    const renderItem = ({ item }: { item: any }) => (
        <Pressable style={[styles.itemWrapper]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
        </Pressable>
    );
    return (
        <View style={styles.container}>
            {/* Title */}
            <View>
                <Text style={styles.title}>Bài học nổi bật</Text>
            </View>
            {/* List */}
            <FlatList
                data={lessons}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatlist}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    flatlist: {
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 600,
    },
    link: {
        fontSize: 12,
        fontWeight: 500,
        textDecorationLine: "underline",
        fontStyle: "italic",
        color: Colors.Sky,
    },
    itemWrapper: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.White,
        marginRight: 15,
        width: 220,
    },
    itemTitle: {
        fontSize: 16,
    },
});

export default HomeSectionLesson;
