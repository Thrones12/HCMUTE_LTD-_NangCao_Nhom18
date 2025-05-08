import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GStyles, Colors, Data } from "@/constants";
import { Course, Subject } from "@/services";
import { Header, SubjectCard } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const SubjectListScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const { courseId } = route.params;
    const [course, setCourse] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch chương trình học
    useEffect(() => {
        const fetchData = async (courseId: string) => {
            try {
                const data = await Course.GetOne(courseId);
                setCourse(data);
            } catch (error) {
                console.error("Lỗi khi lấy chương trình học:", error);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) fetchData(courseId);
    }, [courseId]);
    // Fetch danh sách môn học bằng courseId
    useEffect(() => {
        const fetchData = async (courseId: string) => {
            try {
                const data = await Subject.GetAllByCourse(courseId);
                setSubjects(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách môn học:", error);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) fetchData(courseId);
    }, [courseId]);
    // Render item của flatlist
    const renderItem = ({ index, item }: { item: any; index: any }) => (
        <SubjectCard
            index={index}
            item={item}
            onPress={() =>
                navigation.navigate("LessonList", {
                    subjectId: item._id,
                })
            }
        />
    );
    return (
        <View style={GStyles.container}>
            <Header title={course.title} />
            {loading ? (
                <ActivityIndicator size='large' color={Colors.Sky} />
            ) : subjects && subjects.length > 0 ? (
                <FlatList
                    data={subjects}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                />
            ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                    Không có môn học nào.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default SubjectListScreen;
