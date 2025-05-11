import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Alert,
    Pressable,
    Modal,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Exam, ExamResult } from "@/services";
import { Colors, GStyles } from "@/constants";
import { ButtonComponent, Header, QuestionCard } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import TimeFormat from "@/utils/TimeFormat";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { AuthContext } from "@/contexts/AuthContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const { width: screenWidth } = Dimensions.get("window");
const ExamScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const { examId } = route.params;
    const [isLiked, setIsLiked] = useState<any>(false);
    const [isSaved, setIsSaved] = useState<any>(false);
    const { userId } = useContext(AuthContext);
    const [exam, setExam] = useState<any>();
    const [timer, setTimer] = useState<any>(0);
    const [answers, setAnswers] = useState<any>([]);
    const answersRef = useRef(answers); // Để luôn cập nhập lại answer tránh tình trạng setInterval giữ lại giá trị answer init
    // Modal start
    const [showStartModal, setShowStartModal] = useState(true);
    // Modal result
    const [showResult, setShowResult] = useState<any>(false);
    const [results, setResults] = useState<any>([]);
    const [score, setScore] = useState<any>(0);
    // Scroll to top
    const flatListRef = useRef<FlatList>(null);
    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };
    // Fetch bài kiểm tra
    useEffect(() => {
        const fetchData = async (examId: string) => {
            try {
                const data = await Exam.GetOne(examId);
                setExam(data);
                setAnswers(data.questions.map((q: any) => ""));
                // Kiểm tra người dùng có like / save bài kiểm tra chưa
                setIsLiked(data.likes.find((like: any) => like === userId));
                setIsSaved(data.saves.find((save: any) => save === userId));
            } catch (error) {
                console.error("Lỗi khi tải bài kiểm tra:", error);
            }
        };

        if (examId) fetchData(examId);
    }, [examId]);
    // Bộ đếm thời gian
    useEffect(() => {
        if (showResult || showStartModal) return;

        const interval = setInterval(() => {
            setTimer((prev: number) => {
                const next = prev + 1;

                if (exam && next >= exam.duration) {
                    clearInterval(interval); // Dừng bộ đếm
                    handleSubmit(); // Gọi hàm nộp bài
                }

                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showResult, showStartModal, exam]);
    useEffect(() => {
        answersRef.current = answers;
    }, [answers]);
    // Xác nhận người dùng muốn rời khỏi kiểm tra
    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            if (showStartModal) {
                // Nếu modal start đang hiển thị, cho phép rời đi mà không hỏi
                return;
            }

            e.preventDefault();

            Alert.alert(
                "Rời khỏi bài thi?",
                "Bạn có chắc chắn muốn rời khỏi? Mọi tiến trình sẽ bị mất.",
                [
                    { text: "Ở lại", style: "cancel", onPress: () => {} },
                    {
                        text: "Rời khỏi",
                        style: "destructive",
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        });

        return unsubscribe;
    }, [navigation, showStartModal]);
    const convertLevel = (level: string) => {
        return level === "Easy"
            ? "Nhận biết"
            : level === "Medium"
            ? "Thông hiểu"
            : level === "Hard"
            ? "VD"
            : "VDC";
    };
    const convertExamLevel = (level: string) => {
        return level === "Easy"
            ? "Dễ"
            : level === "Medium"
            ? "Trung bình"
            : level === "Hard"
            ? "Khó"
            : "Kịch trần";
    };
    // Render question
    const renderItem = ({ item, index }: any) => (
        <View style={{ padding: 15 }}>
            <View style={styles.question}>
                <Text style={styles.questionText}>
                    Câu {index + 1} {"["}
                    {convertLevel(item.level)}
                    {"]"}: {item.question}
                </Text>
                <View style={styles.optionsContainer}>
                    {item.options.map((option: string, i: number) => (
                        <Pressable
                            key={i}
                            style={[
                                styles.option,
                                {
                                    backgroundColor:
                                        answers[index] ===
                                        `${item._id}-${option}`
                                            ? Colors.Blue500
                                            : Colors.Gray300,
                                },
                            ]}
                            onPress={() =>
                                handleQuestionSelect(index, item._id, option)
                            }
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    {
                                        color:
                                            answers[index] ===
                                            `${item._id}-${option}`
                                                ? Colors.White
                                                : Colors.Gray800,
                                    },
                                ]}
                            >
                                {option}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
    // Phát âm thanh khi người dùng chọn option
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/ting.mp3") // Sử dụng require để truy cập tệp âm thanh cục bộ
        );
        await sound.playAsync();
    };
    const handleQuestionSelect = (index: any, questionId: any, option: any) => {
        let tempAnswer = [...answers];
        tempAnswer[index] = `${questionId}-${option}`; // questionId để phân biệt chọn option nào của các question khác nhau
        setAnswers([...tempAnswer]);
        playSound();
    };
    const handleSubmit = async () => {
        // Kiểm tra answer đúng / sai
        const answerMap: { [key: string]: string } = {};
        // Tách questionId và option từ mỗi phần tử trong answers
        const currentAnswers = answersRef.current;
        currentAnswers.forEach((item: any) => {
            const [questionId, option] = item.split("-");
            answerMap[questionId] = option;
        });
        // So sánh từng câu hỏi trong exam với đáp án người dùng
        const result = exam.questions.map((question: any) => {
            const userAnswer = answerMap[question._id];
            return userAnswer === question.answer;
        });
        setResults(result);
        let resultScore = (
            (result.filter((r: any) => r === true).length / answers.length) *
            10
        ).toFixed(1);
        setScore(resultScore);
        // Xử lý tạo exam result
        await ExamResult.SubmitExam({
            userId,
            exam: examId,
            score: Number(resultScore),
            duration: timer,
            answers: result,
        });
        setShowResult(true);
    };
    const handleReset = () => {
        setAnswers(exam.questions.map((q: any) => ""));
        setResults([]);
        setScore(0);
        setTimer(0);
        setShowResult(false);
        scrollToTop();
    };
    const handleLike = async () => {
        if (isLiked) {
            await Exam.Unlike(examId, userId);
        } else {
            await Exam.Like(examId, userId);
        }
        const data = await Exam.GetOne(examId);
        setExam(data);
        setIsLiked(data.likes.find((like: any) => like === userId));
    };
    const handleSave = async () => {
        if (isSaved) {
            await Exam.Unsave(examId, userId);
        } else {
            await Exam.Save(examId, userId);
        }
        const data = await Exam.GetOne(examId);
        setExam(data);
        setIsSaved(data.saves.find((save: any) => save === userId));
    };
    return (
        <View style={GStyles.container}>
            {/* Header */}
            {exam && (
                <View style={styles.headerContainer}>
                    <Pressable
                        style={styles.headerBackButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name='chevron-back' size={24} color='#000' />
                    </Pressable>
                    <Text style={styles.headerTitle}>{exam.title}</Text>
                </View>
            )}
            {/* Question list */}
            {exam && (
                <FlatList
                    ref={flatListRef}
                    data={exam.questions}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ marginVertical: 0 }}
                />
            )}
            {/* Footer */}
            {exam && (
                <View style={styles.footer}>
                    <View style={styles.timerWrapper}>
                        <Ionicons
                            name='timer-outline'
                            size={24}
                            color={Colors.Gray800}
                        />
                        <Text style={styles.timer}>
                            {TimeFormat.formatChapterTime(
                                exam.duration - timer
                            )}
                        </Text>
                    </View>
                    <Text style={styles.answerCounter}>
                        {answers.filter((a: any) => a !== "").length} /{" "}
                        {exam.questions.length} câu
                    </Text>
                    <ButtonComponent
                        type='primary'
                        text='Nộp bài'
                        onPress={handleSubmit}
                        styles={styles.button}
                        textStyles={styles.buttonText}
                        bgColor={Colors.Blue500}
                        bgColorPress={Colors.Blue600}
                    />
                </View>
            )}
            {/* Modal start */}
            {exam && (
                <Modal
                    visible={showStartModal}
                    animationType='slide'
                    transparent={true}
                    onRequestClose={() => {
                        // Xử lý khi nhấn nút back trên Android
                        navigation.goBack();
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>{exam.title}</Text>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalText}>
                                    Số lượng câu hỏi:
                                </Text>
                                <Text style={styles.modalText}>
                                    {exam.questions.length} câu
                                </Text>
                            </View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalText}>
                                    Thời gian làm bài:
                                </Text>
                                <Text style={styles.modalText}>
                                    {TimeFormat.formatChapterTime(
                                        exam.duration
                                    )}
                                </Text>
                            </View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalText}>Độ khó:</Text>
                                <Text style={styles.modalText}>
                                    {convertExamLevel(exam.level)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 15,
                                    marginTop: 15,
                                }}
                            >
                                <Pressable
                                    style={[styles.iconButton]}
                                    onPress={() => handleLike()}
                                >
                                    <Ionicons
                                        name={
                                            isLiked ? "heart" : "heart-outline"
                                        }
                                        size={24}
                                        color={Colors.Blue500}
                                    />
                                </Pressable>
                                <Pressable
                                    style={[styles.button]}
                                    onPress={() => setShowStartModal(false)}
                                >
                                    <Text style={styles.buttonText}>
                                        Bắt đầu
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.iconButton]}
                                    onPress={() => handleSave()}
                                >
                                    <Ionicons
                                        name={
                                            isSaved
                                                ? "bookmark"
                                                : "bookmark-outline"
                                        }
                                        size={24}
                                        color={Colors.Blue500}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {/* Modal result */}
            <Modal
                visible={showResult}
                animationType='fade'
                transparent={true}
                onRequestClose={() => {
                    // Xử lý khi nhấn nút back trên Android
                    navigation.goBack();
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Kết quả bài thi</Text>

                        <View style={styles.modalRow}>
                            <Text style={styles.modalText}>Số câu đúng: </Text>
                            <Text style={styles.modalText}>
                                {results.filter((r: any) => r === true).length}/
                                {answers.length}
                            </Text>
                        </View>
                        <View style={styles.modalRow}>
                            <Text style={styles.modalText}>Thời gian:</Text>
                            <Text style={styles.modalText}>
                                {TimeFormat.formatChapterTime(timer)}
                            </Text>
                        </View>
                        <View style={styles.modalRow}>
                            <Text style={styles.modalText}>Điểm:</Text>
                            <Text style={styles.modalText}>{score}/10</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 15,
                                marginTop: 15,
                            }}
                        >
                            <Pressable
                                style={[styles.iconButton]}
                                onPress={() => handleLike()}
                            >
                                <Ionicons
                                    name={isLiked ? "heart" : "heart-outline"}
                                    size={24}
                                    color={Colors.Blue500}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => handleReset()}
                                style={[styles.button]}
                            >
                                <Text style={styles.buttonText}>Làm lại</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.iconButton]}
                                onPress={() => handleSave()}
                            >
                                <Ionicons
                                    name={
                                        isSaved
                                            ? "bookmark"
                                            : "bookmark-outline"
                                    }
                                    size={24}
                                    color={Colors.Blue500}
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // Header
    headerContainer: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 48, // đảm bảo chiều cao cố định để căn giữa
    },
    headerBackButton: {
        position: "absolute",
        left: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: Colors.Gray800,
    },
    // Question
    question: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    optionsContainer: {
        gap: 10,
    },
    option: {
        padding: 12,
        borderRadius: 8,
    },
    optionText: {
        fontSize: 16,
    },
    // Footer
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: Colors.White,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    timerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    timer: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.Gray800,
    },
    answerCounter: {
        fontSize: 24,
        fontWeight: 600,
        color: Colors.Gray800,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: Colors.Blue500,
        elevation: 2,
    },
    buttonText: {
        color: Colors.White,
        fontSize: 18,
        fontWeight: 600,
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 12,
        width: "80%",
        alignItems: "center",
    },
    modalRow: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    modalText: {
        fontSize: 16,
        marginVertical: 4,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.White,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.Blue500,
    },
});

export default ExamScreen;
