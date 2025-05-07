import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GStyles, Colors } from "@/constants";
import { Constant } from "@/constants/Constant";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Lesson } from "@/services";
import { LessonCard } from "@/components";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const PAGE_SIZE = 10;
const LessonListScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const { subjectId } = route.params;
    const [lessons, setLessons] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch danh sách bài học bằng subjectId
    useEffect(() => {
        const fetchData = async (subjectId: string) => {
            try {
                const data = await Lesson.GetAllBySubject(subjectId);
                setLessons(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học:", error);
            } finally {
                setLoading(false);
            }
        };

        if (subjectId) fetchData(subjectId);
    }, [subjectId]);
    // Render item của flatlist
    const renderItem = ({ item }: { item: any }) => (
        <LessonCard
            item={item}
            onPress={() =>
                navigation.navigate("LessonTab", {
                    lessonId: item._id,
                })
            }
        />
    );
    return (
        <View style={GStyles.container}>
            <View style={GStyles.flatlistContainer}>
                {loading ? (
                    <ActivityIndicator size='large' color={Colors.Sky} />
                ) : lessons && lessons.length > 0 ? (
                    <FlatList
                        data={lessons}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Không có bài học nào.
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});
export default LessonListScreen;
