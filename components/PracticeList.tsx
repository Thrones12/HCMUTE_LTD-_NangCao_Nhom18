// Hiển thị danh sách các bài luyện tập - dùng lazyloading
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

const allData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Môn học ${i + 1}`,
    course: "Lớp 12",
}));

const PAGE_SIZE = 10;

const PracticeList = () => {
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
            const newData = allData.slice(start, end);

            setData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (end >= allData.length) {
                setAllLoaded(true);
            }
        }, 1000); // giả lập loading API
    };

    useEffect(() => {
        loadData();
    }, []);

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.course}>{item.course}</Text>
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loading ? (
                    <View style={{ padding: 10 }}>
                        <ActivityIndicator size='small' color='#888' />
                    </View>
                ) : null
            }
        />
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
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    course: {
        fontSize: 14,
        color: "#666",
    },
});
export default PracticeList;
