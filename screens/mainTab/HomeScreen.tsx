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
import { CardExam, CourseComponent, SlideShow, TopExam } from "@/components";
import axios from "axios";
import { Constant } from "@/constants/Constant";
import Notification from "@/services/Notification";

let categories = [
    { _id: "1", name: "Frontend", icon: "home-outline" },
    { _id: "2", name: "Backend", icon: "home-outline" },
    { _id: "3", name: "DevOps", icon: "home-outline" },
    { _id: "4", name: "FullStack", icon: "home-outline" },
    { _id: "5", name: "Android", icon: "home-outline" },
    { _id: "6", name: "DataAnalyst", icon: "home-outline" },
];

const PAGE_SIZE = 10;
const HomeScreen = ({ navigation }: any) => {
    const API = Constant.API;
    const [courses, setCourses] = useState([]);
    const [topExams, setTopExams] = useState([]);
    const [exams, setExams] = useState([]);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

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
    // fetch course
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/course`);
                let data = res.data.data;
                setCourses(data);
            } catch (err: any) {
                if (err.status === 404) Notification.error(err.data.message);
                else Notification.error(err.data.message);
            }
        };
        fetchData();
    }, []);
    // fetch top exam
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/exam/top`);
                let data = res.data.data;
                setTopExams(data);
            } catch (err: any) {
                if (err.status === 404) Notification.error(err.data.message);
                else Notification.error(err.data.message);
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
                if (err.status === 404) Notification.error(err.data.message);
                else Notification.error(err.data.message);
            }
        };
        fetchData();
        loadData();
    }, []);

    // load data
    useEffect(() => {
        loadData();
    }, [exams]);

    return (
        <View style={[GStyles.container]}>
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={
                    <View>
                        {/* Slide show */}
                        <View style={{ marginVertical: 0 }}>
                            <SlideShow />
                        </View>

                        {/* Course */}
                        <View style={[styles.container]}>
                            <Text style={styles.title}>Khóa học</Text>
                            <CourseComponent
                                courses={courses}
                                navigation={navigation}
                            />
                        </View>

                        {/* Top view */}
                        <View style={[styles.container]}>
                            <Text style={styles.title}>Nổi bật</Text>
                            <TopExam exams={topExams} navigation={navigation} />
                        </View>

                        {/* Practice wrapper */}
                        <View style={[styles.container]}>
                            <Text style={styles.title}>Luyện tập</Text>
                            <View style={{ gap: 10 }}>
                                {data.map((item, index) => (
                                    <CardExam
                                        key={index}
                                        item={item}
                                        navigation={navigation}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>
                }
                contentContainerStyle={{
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
    container: {
        backgroundColor: Colors.white,
        padding: 8,
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        height: 30,
    },
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
});

export default HomeScreen;
