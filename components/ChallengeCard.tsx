import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const { width: screenWidth } = Dimensions.get("window");
const ChallengeCard = ({ item, onPress }: any) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={onPress}>
                <View style={[styles.main]}>
                    <Text style={styles.mainTitle}>{item.challenge.title}</Text>
                    <Text style={styles.subTitle}>
                        {item.progress.filter((p: any) => p === true).length} /{" "}
                        {item.progress.length} hoàn thành
                    </Text>
                    <View style={styles.progressContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                {
                                    width: `${
                                        (item.progress.filter(
                                            (p: any) => p === true
                                        ).length /
                                            item.progress.length) *
                                        100
                                    }%`,
                                },
                            ]}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    item: {
        backgroundColor: Colors.White,
        padding: 5,
        borderRadius: 10,
        elevation: 2,
    },
    main: { padding: 15, borderRadius: 5, backgroundColor: "#D6EAF8" },
    mainTitle: { fontSize: 20, fontWeight: 600, color: Colors.Gray800 },
    subTitle: { fontSize: 14, fontWeight: 500, color: Colors.Gray600 },
    progressContainer: {
        marginTop: 15,
        height: 8,
        width: "100%",
        backgroundColor: Colors.White,
        borderRadius: 5,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: Colors.Blue500, // hoặc bất kỳ màu nào
    },
});
export default ChallengeCard;
