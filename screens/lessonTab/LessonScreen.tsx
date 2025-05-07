import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { VideoComponent, DocumentComponent } from "@/components";
import LikeButton from "@/components/LikeButton";

const { width: screenWidth } = Dimensions.get("window");
const LessonScreen = ({ lesson }: any) => {
    return (
        <View style={{ flex: 1 }}>
            {/* Begin: Video */}
            <View style={styles.videoContainer}>
                <VideoComponent uri={lesson.videoUrl} />
            </View>
            {/* End: Video */}

            {/* Begin: Document */}
            <View style={styles.documentContainer}>
                <DocumentComponent htmlContent={lesson.document} />
                {/* Nút yêu thích nổi */}
            </View>
            {/* End: Document */}
        </View>
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        width: screenWidth,
        height: 250,
    },
    documentContainer: {
        width: screenWidth,
        flex: 1,
    },
});

export default LessonScreen;
