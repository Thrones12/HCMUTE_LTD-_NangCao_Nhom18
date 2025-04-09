import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const DocumentComponent = ({ htmlContent }: any) => {
    return (
        <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={{ width: "100%" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
    );
};

export default DocumentComponent;
