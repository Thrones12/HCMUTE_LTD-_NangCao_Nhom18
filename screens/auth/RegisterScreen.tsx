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
    Alert,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Colors, GStyles } from "@/constants";
import { ButtonComponent, InputTextComponent } from "@/components";
import Notification from "@/services/Notification";

const RegisterScreen = ({ navigation }: any) => {
    const { register } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Tạo ref
    const passwordInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);

    const handleRegister = async () => {
        setLoading(true);
        const res = await register(fullname, email, password);
        setLoading(false);
        if (res === true) navigation.navigate("Vertify", { email });
        else if (res === "notVertify") {
            Alert.alert(
                "Thông báo",
                "Email đã được đăng ký nhưng chưa xác thực. Bạn có muốn xác thực không?",
                [
                    {
                        text: "Hủy",
                        onPress: () => console.log("Hủy"),
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            Notification.info("OTP đã được gửi qua email");
                            navigation.navigate("Vertify", {
                                email,
                                type: "forget",
                            });
                        },
                    },
                ]
            );
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Loading */}
                {loading ? (
                    <View style={styles.indicator}>
                        <ActivityIndicator size='large' color='#0000ff' />
                    </View>
                ) : null}
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
                    <Text style={styles.titleText}>Đăng ký</Text>
                </View>
                {/* Input view */}
                <View style={styles.inputView}>
                    <InputTextComponent
                        value={fullname}
                        onChangeText={setFullname}
                        placeholder='Họ và tên'
                        returnKeyType='next'
                        onSubmitEditing={() => emailInputRef.current?.focus()} // Chuyển focus
                        styles={styles.inputText}
                    />
                    <InputTextComponent
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                        returnKeyType='next'
                        ref={emailInputRef}
                        onSubmitEditing={() =>
                            passwordInputRef.current?.focus()
                        } // Chuyển focus
                        styles={styles.inputText}
                    />
                    <InputTextComponent
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        secureTextEntry
                        returnKeyType='done'
                        ref={passwordInputRef}
                        onSubmitEditing={handleRegister} // Gọi hàm đăng nhập
                        styles={styles.inputText}
                    />
                    <ButtonComponent
                        type='primary'
                        text='Đăng ký'
                        onPress={handleRegister}
                        textStyles={styles.buttonLoginText}
                        styles={styles.buttonLogin}
                        bgColor={Colors.Sky}
                        bgColorPress={Colors.SkyPress}
                    />
                    {/* Login link */}
                    <View style={styles.registerLinkView}>
                        <Text>Bạn đã tài khoản?</Text>
                        <ButtonComponent
                            type='link'
                            text='Đăng nhập'
                            onPress={() => navigation.navigate("Login")}
                            textStyles={styles.registerLinkText}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

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
        color: Colors.white,
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 240,
        width: "100%",
    },
    inputText: {
        backgroundColor: Colors.LightGray2,
        paddingVertical: 16,
        paddingLeft: 20,
        borderRadius: 15,
    },
    textForget: {
        fontStyle: "italic",
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
    registerLinkView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    registerLinkText: {
        color: Colors.Sky,
        fontWeight: 500,
        marginLeft: 4,
    },
});
