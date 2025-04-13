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
import Notification from "@/services/Notification";
import axios from "axios";
import { Constant } from "@/constants/Constant";
import { Ionicons } from "@expo/vector-icons";
import { CardExam } from "@/components";

const PAGE_SIZE = 10;
const PracticeScreen = ({ navigation }: any) => {
    const API = Constant.API;

    const [exams, setExams] = useState([]);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const loadData = () => {
        if (loading || allLoaded) return;

        setLoading(true);
        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const newData = exams.slice(start, end);

            console.log("Load thêm:", newData);

            setData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (end >= exams.length) {
                setAllLoaded(true);
            }
        }, 1000);
    };
    const renderItem = ({ item }: any) => (
        <View style={styles.itemWrapper}>
            <Pressable
                onPress={() => navigation.navigate("Exam", { exam: item })}
                style={styles.item}
            >
                <CardExam item={item} />
            </Pressable>
        </View>
    );

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await axios.get(`${API}/exam`);
                let data = res.data.data;
                setExams(data);
            } catch (err: any) {
                Notification.error(err.data.message);
            }
        };
        fetchExam();
    }, []);

    useEffect(() => {
        if (exams.length > 0) {
            const start = 0;
            const end = PAGE_SIZE;
            const newData = exams.slice(start, end);

            setData(newData);
            setPage(2); // Vì đã load trang 1
            setAllLoaded(newData.length >= exams.length);
        }
    }, [exams]);
    return (
        <View style={[GStyles.container]}>
            <View
                style={{
                    flexGrow: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                    backgroundColor: Colors.white,
                }}
            >
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                    ListHeaderComponent={
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: 600,
                                height: 30,
                                margin: 10,
                            }}
                        >
                            Luyện tập
                        </Text>
                    }
                    onEndReached={loadData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading && !allLoaded ? (
                            <View style={{ padding: 10 }}>
                                <ActivityIndicator size='small' color='#888' />
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: "transparent",
        padding: 8,
    },
    item: {
        backgroundColor: Colors.Gray100,
        borderRadius: 10,
        elevation: 2,
        minHeight: 95,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
    },
    video: {
        backgroundColor: Colors.Sky,
        flex: 3,
    },
    content: {
        backgroundColor: Colors.white,
        flex: 5,
        padding: 8,
        display: "flex",
        flexDirection: "column",
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 600,
    },
    subInfo: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    infoItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    infoText: { color: Colors.Gray600 },
});
export default PracticeScreen;
