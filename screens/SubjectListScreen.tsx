import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { GStyles, Colors, Data } from "@/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Notification from "@/services/Notification";
import axios from "axios";
import { Constant } from "@/constants/Constant";

const { width: screenWidth } = Dimensions.get("window");

const SubjectListScreen = ({ route, navigation }: any) => {
    const { _id, courseTitle } = route.params;
    const API = Constant.API;
    const [subjects, setSubjects] = useState<any>([]);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const res = await axios.get(`${API}/subject`);
                let data = res.data.data;
                setSubjects(data);
            } catch (err: any) {
                Notification.error(err.data.message);
            }
        };
        fetchSubject();
    }, [_id]);
    return (
        <View style={[GStyles.container, styles.container]}>
            <Text style={styles.courseTitle}>{courseTitle}</Text>
            <View style={styles.subjectWrapper}>
                {subjects.map((subject: any, index: any) => (
                    <View style={styles.subjectContainer} key={index}>
                        <Pressable
                            style={styles.subject}
                            onPress={() =>
                                navigation.navigate("LessonList", {
                                    title: subject.title,
                                    lessons: subject.lessons,
                                })
                            }
                        >
                            <View style={styles.primaryInfo}>
                                <Text
                                    numberOfLines={2}
                                    style={styles.subjectTitle}
                                >
                                    {subject.title}
                                </Text>
                            </View>
                            <View style={styles.secondaryInfo}>
                                <Text style={styles.lessonCount}>
                                    {`${subject.lessons.length} bài học`}
                                </Text>

                                <View style={styles.viewWrapper}>
                                    <Text style={styles.viewCount}>
                                        {subject.views}
                                    </Text>
                                    <Ionicons
                                        name='eye-outline'
                                        size={15}
                                        color={Colors.Gray600}
                                        style={{ marginTop: 1 }}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 0,
        borderRadius: 10,
        margin: 10,
    },
    courseTitle: {
        fontSize: 22,
        fontWeight: 600,
        height: 30,
        margin: 10,
    },
    subjectWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    subjectContainer: {
        width: "50%",
        backgroundColor: Colors.white,
    },
    subject: {
        backgroundColor: Colors.Gray100,
        margin: 8,
        padding: 8,
        borderRadius: 10,
        elevation: 2,
        minHeight: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    primaryInfo: {},
    subjectTitle: {
        fontSize: 16,
        fontWeight: 600,
    },

    secondaryInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    lessonCount: { color: Colors.Gray600 },
    viewWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    viewCount: { color: Colors.Gray600 },
});

export default SubjectListScreen;
