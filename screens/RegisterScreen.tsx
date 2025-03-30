import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Colors, GStyles } from "@/constants";
import { ButtonComponent, InputTextComponent } from "@/components";

const RegisterScreen = ({ navigation }: any) => {
    const { register } = useContext(AuthContext);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Tạo ref
    const passwordInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);

    const handleRegister = () => {
        register(fullname, email, password);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={GStyles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Back ground title */}
                <View style={styles.backgroundView}>
                    <Image
                        source={require("../assets/images/background.png")}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                    <Image
                        source={require("../assets/images/light.png")}
                        style={{
                            position: "absolute",
                            top: -12,
                            left: 30,
                            transform: "scale(0.9)",
                        }}
                    />
                    <Image
                        source={require("../assets/images/light.png")}
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
                        placeHolder='Họ và tên'
                        returnKeyType='next'
                        onSubmitEditing={() => emailInputRef.current?.focus()} // Chuyển focus
                        styles={styles.inputText}
                    />
                    <InputTextComponent
                        value={email}
                        onChangeText={setEmail}
                        placeHolder='Email'
                        returnKeyType='next'
                        inputRef={emailInputRef}
                        onSubmitEditing={() =>
                            passwordInputRef.current?.focus()
                        } // Chuyển focus
                        styles={styles.inputText}
                    />
                    <InputTextComponent
                        value={password}
                        onChangeText={setPassword}
                        placeHolder='Password'
                        secureTextEntry
                        returnKeyType='done'
                        inputRef={passwordInputRef}
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
