import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");
const VideoComponent = ({ videoSource, time, times, onTime }: any) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.pause();
    });
    useEvent(player, "timeUpdate", {
        currentTime: player.currentTime,
    });
    // Theo dõi thời gian phát
    useEffect(() => {
        const interval = setInterval(() => {
            if (!player?.ready || !Array.isArray(times)) return;

            const timeNow = player.currentTime;
            setCurrentTime(timeNow);

            let index = -1;
            for (let i = 0; i < times.length; i++) {
                if (timeNow > times[i]) index = i;
            }

            if (index !== -1 && index !== currentIndex) {
                setCurrentIndex(index);
                onTime(index);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [player, times, currentIndex]);

    // Seek video khi `time` thay đổi
    useEffect(() => {
        if (player && time) {
            player.currentTime = time;
        }
    }, [time, player]);
    return (
        <View style={styles.contentContainer}>
            <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        width: screenWidth - 30,
        height: ((screenWidth - 30) * 3) / 4,
        borderRadius: 15,
        overflow: "hidden",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    video: {
        width: screenWidth - 30,
        height: ((screenWidth - 30) * 3) / 4,
    },
    controlsContainer: {
        padding: 10,
    },
});
export default VideoComponent;
