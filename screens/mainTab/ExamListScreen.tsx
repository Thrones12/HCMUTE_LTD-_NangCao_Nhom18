import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Exam } from "@/services";
import { ExamCard } from "@/components";
import { Colors, GStyles } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const ExamListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [exams, setExams] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch danh sách bài kiểm tra
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Exam.GetAll();
                setExams(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách môn học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
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
    return (
        <View style={GStyles.container}>
            <View style={GStyles.flatlistContainer}>
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
            </View>
        </View>
    );
};

export default ExamListScreen;
