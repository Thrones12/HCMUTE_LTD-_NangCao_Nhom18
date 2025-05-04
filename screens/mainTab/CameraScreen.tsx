import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import type { CameraCapturedPicture } from "expo-camera";

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null); // 💡 ref tới CameraView

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title='Grant permission' />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const takePicture = async () => {
        const camera = cameraRef.current;
        if (camera) {
            const photo = await camera.takePictureAsync();
            console.log("Ảnh đã chụp:", photo?.uri);
            Alert.alert("Chụp ảnh thành công!", photo?.uri);
        } else {
            console.warn("Camera chưa sẵn sàng!");
        }
    };

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraFacing}
                    >
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <Text style={styles.text}>📸 Chụp</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: { flex: 1 },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 12,
        borderRadius: 8,
    },
    text: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
