import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
const VideoComponent = ({ uri }: any) => {
    return (
        <WebView
            style={{ height: 200 }}
            source={{ uri: uri }}
            javaScriptEnabled
            allowsFullscreenVideo
        />
    );
};

export default VideoComponent;
