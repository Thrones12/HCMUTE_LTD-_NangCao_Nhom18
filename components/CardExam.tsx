import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const CardExam = ({ item, navigation }: any) => {
    return (
        <Pressable
            onPress={() =>
                navigation.navigate("LessonTab", {
                    _id: item._id,
                })
            }
            style={styles.item}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoWrapper}>
                <Text numberOfLines={3} style={styles.title}>
                    {item.title}
                </Text>
                <View style={styles.info}>
                    <View style={styles.subInfo}>
                        <Ionicons
                            name='eye-outline'
                            size={16}
                            color={Colors.Gray600}
                        />
                        <Text style={styles.infoText}>{item.views}</Text>
                    </View>
                    <View style={styles.subInfo}>
                        <Ionicons
                            name='heart-outline'
                            size={16}
                            color={Colors.Gray600}
                        />
                        <Text style={styles.infoText}>{item.likes.length}</Text>
                    </View>
                    <View style={styles.subInfo}>
                        <Ionicons
                            name='bookmark-outline'
                            size={16}
                            color={Colors.Gray600}
                        />
                        <Text style={styles.infoText}>{item.saves.length}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    item: {
        backgroundColor: Colors.Gray100,
        borderRadius: 12,
        width: "100%",
        height: 100,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
    },
    image: {
        height: "100%",
        width: 100,
        objectFit: "cover",
    },
    infoWrapper: {
        width: 150,
        marginHorizontal: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        color: Colors.Gray700,
        marginBottom: 5,
    },
    info: { display: "flex", flexDirection: "row", gap: 8 },
    subInfo: { display: "flex", flexDirection: "row", gap: 2 },
    icon: {},
    infoText: { fontSize: 12, color: Colors.Gray600 },
});

export default CardExam;
