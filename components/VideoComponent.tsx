import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
const VideoComponent = () => {
    return (
        <WebView
            style={{ height: 200 }}
            source={{ uri: "https://www.youtube.com/embed/dQw4w9WgXcQ" }}
            javaScriptEnabled
            allowsFullscreenVideo
        />
    );
};

export default VideoComponent;
