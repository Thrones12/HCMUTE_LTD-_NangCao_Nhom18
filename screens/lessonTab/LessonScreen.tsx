import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { VideoComponent, DocumentComponent } from "@/components";

const { width: screenWidth } = Dimensions.get("window");
const LessonScreen = ({ _id }: any) => {
    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script type="text/javascript" id="MathJax-script" async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
    </script>
    <style>
      body { font-size: 36px; padding: 16px; }
      p { margin-bottom: 12px; }
    </style>
  </head>
  <body>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
    <p><strong>1. Định nghĩa:</strong></p>
    <p style="text-indent: 20px;">Đây là đoạn văn bản được thụt đầu dòng.</p>
    <p><strong>2. Công thức toán học:</strong></p>
    <p>Ta có công thức: \\( a^2 + b^2 = c^2 \\)</p>
  </body>
</html>
`;
    return (
        <View style={{ flex: 1 }}>
            {/* Begin: Video */}
            <View style={styles.videoContainer}>
                <VideoComponent />
            </View>
            {/* End: Video */}
            {/* Begin: Document */}
            <View style={styles.documentContainer}>
                <DocumentComponent htmlContent={htmlContent} />
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
