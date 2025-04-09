import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Data, GStyles } from "@/constants";
import { LessonItem } from "@/components";

const PAGE_SIZE = 10;
const LessonListScreen = ({ route }: any) => {
    const { _id } = route.params;
    const [lessons, setLessons] = useState([
        { _id: "1", title: "Bài 1: vật lý lớp 10 bài 1" },
        { _id: "2", title: "Bài 2: vật lý lớp 10 bài 2" },
        { _id: "3", title: "Bài 3: vật lý lớp 10 bài 3" },
        { _id: "4", title: "Bài 4: vật lý lớp 10 bài 4" },
        { _id: "5", title: "Bài 1: vật lý lớp 10 bài 1" },
        { _id: "6", title: "Bài 2: vật lý lớp 10 bài 2" },
        { _id: "7", title: "Bài 3: vật lý lớp 10 bài 3" },
        { _id: "8", title: "Bài 4: vật lý lớp 10 bài 4" },
        { _id: "9", title: "Bài 1: vật lý lớp 10 bài 1" },
        { _id: "10", title: "Bài 2: vật lý lớp 10 bài 2" },
        { _id: "11", title: "Bài 3: vật lý lớp 10 bài 3" },
        { _id: "12", title: "Bài 4: vật lý lớp 10 bài 4" },
        { _id: "13", title: "Bài 1: vật lý lớp 10 bài 1" },
        { _id: "14", title: "Bài 2: vật lý lớp 10 bài 2" },
        { _id: "15", title: "Bài 3: vật lý lớp 10 bài 3" },
        { _id: "16", title: "Bài 4: vật lý lớp 10 bài 4" },
        { _id: "17", title: "Bài 4: vật lý lớp 10 bài 4" },
        { _id: "18", title: "Bài 1: vật lý lớp 10 bài 1" },
        { _id: "19", title: "Bài 2: vật lý lớp 10 bài 2" },
        { _id: "20", title: "Bài 3: vật lý lớp 10 bài 3" },
        { _id: "21", title: "Bài 4: vật lý lớp 10 bài 4" },
    ]);

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
            const newData = lessons.slice(start, end);

            setData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (end >= lessons.length) {
                setAllLoaded(true);
            }
        }, 1000);
    };
    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
    useEffect(() => {
        loadData();
    }, []);
    return (
        <View style={GStyles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <LessonItem item={item} />}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={{
                    backgroundColor: "#fff",
                }}
                showsVerticalScrollIndicator={false}
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
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
        height: 80,
    },
    course: {
        fontSize: 14,
        color: "#666",
    },
    cateView: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
});
export default LessonListScreen;
