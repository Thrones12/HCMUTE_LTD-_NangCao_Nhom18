import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Animated,
    Dimensions,
    Pressable,
    Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Course, Exam } from "@/services";
import { ExamCard } from "@/components";
import { Colors, GStyles } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const screenWidth = Dimensions.get("window").width;
const ExamListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [exams, setExams] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [courses, setCourses] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showFilter, setShowFilter] = useState(false);
    const [expandedCourseId, setExpandedCourseId] = useState<string | null>(
        null
    );
    const [selectFilter, setSelectFilter] = useState<any>();
    const [selectSort, setSelectSort] = useState<any>();

    const slideAnim = useState(new Animated.Value(-screenWidth))[0];
    // Fetch danh sách bài kiểm tra
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Exam.GetAll();
                setExams(data);
                setData(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách môn học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // Fetch danh sách khóa học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Course.GetAll();
                setCourses(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách môn học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // Điều khiển animation trượt modal filter
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: showFilter ? 0 : -screenWidth,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [showFilter]);
    // Render item của flatlist
    const renderItem = ({ item }: { item: any }) => (
        <ExamCard
            item={item}
            onPress={() =>
                navigation.navigate("Exam", {
                    examId: item._id,
                })
            }
        />
    );
    useEffect(() => {
        setExams(
            data.filter((exam: any) => exam.subjectTitle === selectFilter)
        );
    }, [selectFilter]);

    useEffect(() => {
        if (!exams || exams.length === 0) return;

        let sortedExams = [...exams];

        if (selectSort === "new") {
            sortedExams.sort(
                (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
            );
        } else if (selectSort === "like") {
            sortedExams.sort(
                (a, b) => (b.likes.length || 0) - (a.likes.length || 0)
            );
        } else {
            sortedExams.sort((a, b) => {
                const scoreA =
                    (a.attemptCount || 0) +
                    (a.likes?.length || 0) +
                    (a.saves?.length || 0);
                const scoreB =
                    (b.attemptCount || 0) +
                    (b.likes?.length || 0) +
                    (b.saves?.length || 0);
                return scoreB - scoreA;
            });
        }

        setExams(sortedExams);
    }, [selectSort]);
    const handleSetFilter = (filter: any) => {
        console.log(filter);
        setSelectFilter(filter);
    };
    const handleSetSort = (sort: any) => {
        console.log(sort);
        setSelectSort(sort);
    };

    return (
        <View style={GStyles.container}>
            {/* Toggle mở filter góc trái */}
            <View
                style={{ position: "absolute", top: 80, left: 0, zIndex: 10 }}
            >
                <Pressable
                    onPress={() => setShowFilter(true)}
                    style={{
                        backgroundColor: Colors.Sky,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderEndEndRadius: 5,
                        borderTopEndRadius: 5,
                    }}
                >
                    <Ionicons name='menu' size={18} color={Colors.White} />
                </Pressable>
            </View>
            {loading ? (
                <ActivityIndicator size='large' color={Colors.Sky} />
            ) : exams && exams.length > 0 ? (
                <FlatList
                    data={exams}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                />
            ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                    Không có bài kiểm tra nào.
                </Text>
            )}
            {/* Modal filter trượt từ trái */}
            <Modal visible={showFilter} transparent animationType='none'>
                {/* Vùng tối để bấm ra ngoài tắt modal */}
                <Pressable
                    onPress={() => setShowFilter(false)}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
                />
                {/* View trượt vào từ trái */}
                <Animated.View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: screenWidth * 0.6,
                        height: "100%",
                        backgroundColor: "#fff",
                        padding: 20,
                        transform: [{ translateX: slideAnim }],
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 20,
                        }}
                    >
                        Bộ lọc
                    </Text>

                    {courses.map((course: any) => (
                        <View key={course._id} style={{ marginBottom: 12 }}>
                            {/* Course title */}
                            <Pressable
                                onPress={() =>
                                    setExpandedCourseId((prev) =>
                                        prev === course._id ? null : course._id
                                    )
                                }
                                style={{
                                    paddingVertical: 4,
                                    paddingHorizontal: 8,
                                    borderRadius: 5,
                                    backgroundColor:
                                        expandedCourseId === course._id
                                            ? Colors.Blue500
                                            : Colors.White,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color:
                                            expandedCourseId === course._id
                                                ? Colors.White
                                                : Colors.Gray800,
                                    }}
                                >
                                    {course.title}
                                </Text>
                            </Pressable>

                            {/* Subjects list nếu course đang mở */}
                            {expandedCourseId === course._id &&
                                course.subjects.map((subject: any) => (
                                    <Pressable
                                        key={subject._id}
                                        style={{
                                            paddingLeft: 12,
                                            paddingVertical: 4,
                                        }}
                                        onPress={() => {
                                            handleSetFilter(subject.title);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                textDecorationLine:
                                                    selectFilter ===
                                                    subject.title
                                                        ? "underline"
                                                        : "none",
                                            }}
                                        >
                                            {subject.title}
                                        </Text>
                                    </Pressable>
                                ))}
                        </View>
                    ))}

                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 20,
                        }}
                    >
                        Sắp xếp
                    </Text>
                    <Pressable
                        style={{ marginBottom: 16 }}
                        onPress={() => {
                            handleSetSort("new");
                        }}
                    >
                        <Text
                            style={{
                                textDecorationLine:
                                    selectSort === "new" ? "underline" : "none",
                            }}
                        >
                            Mới nhất
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{ marginBottom: 16 }}
                        onPress={() => {
                            handleSetSort("best");
                        }}
                    >
                        <Text
                            style={{
                                textDecorationLine:
                                    selectSort === "best"
                                        ? "underline"
                                        : "none",
                            }}
                        >
                            Được yêu thích
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{ marginBottom: 16 }}
                        onPress={() => {
                            handleSetSort("like");
                        }}
                    >
                        <Text
                            style={{
                                textDecorationLine:
                                    selectSort === "like"
                                        ? "underline"
                                        : "none",
                            }}
                        >
                            Nổi bật
                        </Text>
                    </Pressable>
                </Animated.View>
            </Modal>
        </View>
    );
};

export default ExamListScreen;
