import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Course } from "@/services";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const HomeSectionCourse = () => {
    const navigation = useNavigation<NavigationProp>();
    const [courses, setCourses] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch danh sách khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Course.GetAll();
                setCourses(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Render item của flatlist
    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const isEven = index % 2 === 0;
        return (
            <Pressable
                style={[
                    styles.itemWrapper,
                    {
                        backgroundColor: isEven
                            ? Colors.Blue500
                            : Colors.Blue500,
                    },
                ]}
                onPress={() =>
                    navigation.navigate("SubjectList", { courseId: item._id })
                }
            >
                <Text style={styles.itemTitle}>{item.title}</Text>
            </Pressable>
        );
    };
    return (
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.flexRow}>
                <Text style={styles.title}>Chương trình học</Text>
                <Pressable onPress={() => navigation.navigate("CourseList")}>
                    <Text style={styles.link}>Tất cả</Text>
                </Pressable>
            </View>
            {/* List */}
            <FlatList
                data={courses}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
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
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
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
        borderRadius: 5,
        padding: 12,
        marginRight: 10,
        elevation: 2,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: Colors.White,
    },
});

export default HomeSectionCourse;
