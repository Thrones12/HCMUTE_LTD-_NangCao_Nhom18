import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, GStyles } from "@/constants";
import {
    BannerSlideShow,
    HomeSectionHeader,
    HomeSectionCourse,
    HomeSectionLesson,
    ExamCard,
} from "@/components";
import axios from "axios";
import { Constant } from "@/constants/Constant";
import { Banner } from "@/services";
import Noti from "@/utils/Noti";

const PAGE_SIZE = 10;
const HomeScreen = ({ navigation }: any) => {
    const API = Constant.API;
    const [banners, setBanners] = useState([]);
    const [exams, setExams] = useState([]);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    // Fetch danh sách banner được kích hoạt
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Banner.GetAllActive();
                setBanners(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    // fetch exams
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/exam`);
                let data = res.data.data;
                data = data.sort((a: any, b: any) => b.views - a.views);
                setExams(data);
            } catch (err: any) {
                if (err.status === 404) Noti.error(err.data.message);
                else Noti.error(err.data.message);
            }
        };
        fetchData();
        loadData();
    }, []);
    // Load data
    useEffect(() => {
        loadData();
    }, [exams]);
    const loadData = () => {
        if (loading || allLoaded || exams.length === 0) return;

        setLoading(true);
        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const newData = exams.slice(start, end);

            setData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (end >= exams.length) {
                setAllLoaded(true);
            }
        }, 1000);
    };
    return (
        <View style={[GStyles.container]}>
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={
                    <View>
                        {/* HomeSectionHeader */}
                        <HomeSectionHeader />
                        {/* Banner Slide Show */}
                        <BannerSlideShow data={banners} />
                        {/* Course */}
                        <HomeSectionCourse />
                        {/* Top Lesson */}
                        <HomeSectionLesson />

                        {/* Practice wrapper */}
                        <View>
                            <View
                                style={[
                                    styles.flexRow,
                                    {
                                        paddingHorizontal: 15,
                                    },
                                ]}
                            >
                                <Text style={styles.title}>
                                    Bài kiểm tra mới nhất
                                </Text>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("ExamList")
                                    }
                                >
                                    <Text style={styles.link}>Tất cả</Text>
                                </Pressable>
                            </View>
                            <View style={{}}>
                                {data.map((item, index) => (
                                    <ExamCard
                                        key={index}
                                        item={item}
                                        onPress={() =>
                                            navigation.navigate("Exam")
                                        }
                                    />
                                ))}
                            </View>
                        </View>
                    </View>
                }
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
    container: {},
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
    },
    link: {
        fontSize: 12,
        fontWeight: 500,
        textDecorationLine: "underline",
        fontStyle: "italic",
        color: Colors.Sky,
    },
});

export default HomeScreen;
