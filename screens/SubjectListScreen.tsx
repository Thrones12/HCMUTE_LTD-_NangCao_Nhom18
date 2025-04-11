import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { GStyles, Colors, Data } from "@/constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width: screenWidth } = Dimensions.get("window");

const SubjectListScreen = ({ route, navigation }: any) => {
    const { _id } = route.params;
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        const category = Data.course.find((cate) => cate._id === _id);
        if (category && category.subjects) {
            setCategory(category);
        }
    }, [_id]);
    return (
        <View style={[GStyles.container, { marginTop: 50 }]}>
            {category && (
                <>
                    <Text style={styles.title}>{category.title}</Text>
                    <View style={styles.container}>
                        {category.subjects.map((subject: any, index: any) => (
                            <Pressable
                                key={index}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("LessonList", {
                                        _id: subject._id,
                                        navigation: navigation,
                                    })
                                }
                            >
                                <View style={styles.info}>
                                    <Text style={styles.name}>
                                        {subject.title}
                                    </Text>
                                </View>
                                <View style={styles.view}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: Colors.Gray600,
                                        }}
                                    >
                                        518
                                    </Text>
                                    <Ionicons
                                        name='eye-outline'
                                        size={13}
                                        color={Colors.Gray600}
                                    />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
    },
    card: {
        width: screenWidth / 2 - 30,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        padding: 10,
    },
    info: {},
    name: {
        fontSize: 14,
        fontWeight: "500",
    },
    course: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});

export default SubjectListScreen;
