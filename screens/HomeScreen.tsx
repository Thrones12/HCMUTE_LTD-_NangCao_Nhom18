import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Colors, GStyles } from "@/constants";
import { CategoryItemComponent, SlideShow, TopViewLesson } from "@/components";

let categories = [
    { _id: "1", name: "Frontend", icon: "home-outline" },
    { _id: "2", name: "Backend", icon: "home-outline" },
    { _id: "3", name: "DevOps", icon: "home-outline" },
    { _id: "4", name: "FullStack", icon: "home-outline" },
    { _id: "5", name: "Android", icon: "home-outline" },
    { _id: "6", name: "DataAnalyst", icon: "home-outline" },
];
const mockPracticeData = Array.from({ length: 50 }, (_, i) => ({
    _id: i + 1,
    title: `Môn học ${i + 1}`,
    course: "Lớp 12",
}));

const PAGE_SIZE = 10;
const HomeScreen = ({ navigation }: any) => {
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
            const newData = mockPracticeData.slice(start, end);

            setData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (end >= mockPracticeData.length) {
                setAllLoaded(true);
            }
        }, 1000);
    };

    useEffect(() => {
        loadData();
    }, []);

    const renderItem = ({ item }: any) => (
        <Pressable
            onPress={() => navigation.navigate("LessonTab", { _id: item._id })}
            style={styles.item}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.course}>{item.course}</Text>
        </Pressable>
    );
    return (
        <View style={GStyles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                ListHeaderComponent={
                    <View>
                        {/* Slide show */}
                        <View style={{ marginVertical: 20 }}>
                            <SlideShow />
                        </View>

                        {/* Category */}
                        <View>
                            <Text style={styles.title}>Khóa học</Text>
                            <View style={styles.cateView}>
                                {categories.map((cate, index) => (
                                    <CategoryItemComponent
                                        key={index}
                                        category={cate}
                                        navigation={navigation}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Top view */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.title}>Xem nhiều</Text>
                            <TopViewLesson navigation={navigation} />
                        </View>

                        {/* Practice Title */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.title}>Luyện tập</Text>
                        </View>
                    </View>
                }
                contentContainerStyle={{
                    backgroundColor: "#fff",
                    paddingBottom: 40,
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

export default HomeScreen;
