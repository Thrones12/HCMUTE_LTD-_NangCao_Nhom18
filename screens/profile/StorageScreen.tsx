import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Pressable,
    Dimensions,
    Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Exam, User } from "@/services";
import { Header } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GStyles } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const { width: screenWidth } = Dimensions.get("window");
const StorageScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { userId } = useContext(AuthContext);
    const [exams, setExams] = useState<any>([]);
    const [reload, setReload] = useState<any>(false);
    useEffect(() => {
        const fetchData = async (userId: string) => {
            const user = await User.GetOne(userId);
            setExams(user.saves);
        };
        if (userId) fetchData(userId);
    }, [userId, reload]);
    const handleDelete = (examId: any) => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn bỏ lưu bài kiểm tra này?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Xác nhận",
                    onPress: async () => {
                        try {
                            await Exam.Unsave(examId, userId);
                            setReload(!reload);
                        } catch (err) {
                            console.error("Lỗi khi bỏ lưu:", err);
                        }
                    },
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };
    const renderItem = ({ item }: any) => (
        <View style={styles.container}>
            <Pressable
                style={styles.item}
                onPress={() =>
                    navigation.navigate("Exam", { examId: item._id })
                }
            >
                <View style={[styles.main]}>
                    <Text style={styles.mainTitle}>{item.title}</Text>
                    <Text style={styles.subTitle}>
                        {item.courseTitle} - {item.subjectTitle}
                    </Text>
                </View>
                <Pressable onPress={() => handleDelete(item._id)}>
                    <Ionicons
                        name='close-circle'
                        size={22}
                        color={Colors.Red}
                        style={styles.icon}
                    />
                </Pressable>
            </Pressable>
        </View>
    );
    return (
        <View style={GStyles.container}>
            <Header title='Lưu trữ' />
            <FlatList
                data={exams}
                renderItem={renderItem}
                keyExtractor={(item: any) => item._id.toString()}
                contentContainerStyle={{ padding: 15, gap: 10 }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: screenWidth - 30,
        padding: 5,
        elevation: 2,
        backgroundColor: Colors.White,
        borderRadius: 15,
    },
    item: {
        position: "relative",
        backgroundColor: "#D5F2FF",
        padding: 5,
        borderRadius: 10,
        elevation: 2,
    },
    main: { padding: 15, borderRadius: 5 },
    mainTitle: { fontSize: 20, fontWeight: 600, color: Colors.Gray800 },
    subTitle: { fontSize: 14, fontWeight: 500, color: Colors.Gray500 },
    icon: { position: "absolute", top: -95, right: -18 },
});

export default StorageScreen;
