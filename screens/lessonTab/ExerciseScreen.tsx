import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { DocumentComponent } from "@/components";

const { width: screenWidth } = Dimensions.get("window");
const ExerciseScreen = ({ lesson }: any) => {
    return (
        <View style={styles.documentContainer}>
            <DocumentComponent htmlContent={lesson.exercise} />
        </View>
    );
};
const styles = StyleSheet.create({
    documentContainer: {
        marginTop: 30,
        width: screenWidth,
        flex: 1,
    },
});

export default ExerciseScreen;
