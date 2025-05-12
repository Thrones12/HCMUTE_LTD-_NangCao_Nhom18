import {
    View,
    Text,
    FlatList,
    Pressable,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ButtonComponent, CourseCard } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";
import { Course } from "@/services";
import { Colors, GStyles } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const CourseListScreen = () => {
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
    const renderItem = ({ item, index }: { item: any; index: any }) => (
        <CourseCard
            index={index}
            item={item}
            onPress={() =>
                navigation.navigate("SubjectList", {
                    courseId: item._id,
                })
            }
        />
    );
    return (
        <View style={GStyles.container}>
            {loading ? (
                <ActivityIndicator size='large' color={Colors.Sky} />
            ) : courses && courses.length > 0 ? (
                <FlatList
                    data={courses}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                />
            ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                    Không có khóa học nào.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default CourseListScreen;
