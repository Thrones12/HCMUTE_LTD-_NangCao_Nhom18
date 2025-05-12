import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Colors, GStyles } from "@/constants";
import {
    ButtonComponent,
    CheckBoxComponent,
    InputTextComponent,
} from "@/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const ForgetPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        navigation.navigate("Verify", { email, type: "Forget" });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Back ground title */}
                <View style={styles.backgroundView}>
                    <Image
                        source={require("../../assets/images/background.png")}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                    <Image
                        source={require("../../assets/images/light.png")}
                        style={{
                            position: "absolute",
                            top: -12,
                            left: 30,
                            transform: "scale(0.9)",
                        }}
                    />
                    <Image
                        source={require("../../assets/images/light.png")}
                        style={{
                            position: "absolute",
                            top: -48,
                            right: 30,
                            transform: "scale(0.6)",
                        }}
                    />
                    <Text style={styles.titleText}>Quên mật khẩu</Text>
                </View>
                {/* Input view */}
                <View style={styles.inputView}>
                    <InputTextComponent
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                        returnKeyType='next'
                        onSubmitEditing={handleSubmit}
                        styles={styles.inputText}
                    />
                    <ButtonComponent
                        type='primary'
                        text='Xác nhận'
                        textStyles={styles.buttonLoginText}
                        styles={styles.buttonLogin}
                        bgColor={Colors.Sky}
                        bgColorPress={Colors.SkyPress}
                        onPress={handleSubmit}
                    />
                    {/* Register link */}
                    <View style={styles.loginLinkView}>
                        <Text>Quay lại trang đăng nhập.</Text>
                        <ButtonComponent
                            type='link'
                            text='Đăng nhập'
                            onPress={() => navigation.navigate("Login")}
                            textStyles={styles.loginLinkText}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    indicator: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
        zIndex: 999,
    },
    inputView: {
        display: "flex",
        gap: 10,
        padding: 20,
        marginTop: 40,
    },
    backgroundView: {
        position: "relative",
        width: "100%",
        height: 400,
    },
    titleText: {
        position: "absolute",
        color: Colors.White,
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 240,
        width: "100%",
    },
    VertifyView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 25,
    },
    inputText: {
        backgroundColor: Colors.Gray200,
        paddingVertical: 16,
        paddingLeft: 20,
        borderRadius: 15,
    },
    buttonLogin: {
        color: "#fff",
        backgroundColor: Colors.Sky,
        borderRadius: 15,
        paddingVertical: 10,
        marginTop: 15,
    },
    buttonLoginText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: 22,
    },
    loginLinkView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginLinkText: {
        color: Colors.Sky,
        fontWeight: 500,
        marginLeft: 4,
    },
});
