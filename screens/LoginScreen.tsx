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
import {
    ButtonComponent,
    CheckBoxComponent,
    InputTextComponent,
} from "@/components";

const LoginScreen = ({ navigation }: any) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemember, setIsRemember] = useState(false);

    // Tạo ref cho input password
    const passwordInputRef = useRef<TextInput>(null);

    const handleLogin = async () => {
        try {
            login(email, password);
        } catch (err) {
            console.log("Lỗi đăng nhập: ", err);
        }
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
                    <Text style={styles.titleText}>Đăng nhập</Text>
                </View>
                {/* Input view */}
                <View style={styles.inputView}>
                    <InputTextComponent
                        value={email}
                        onChangeText={setEmail}
                        placeHolder='Email'
                        returnKeyType='next'
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
                        onSubmitEditing={handleLogin} // Gọi hàm đăng nhập
                        styles={styles.inputText}
                    />
                    {/* Remember & forget password */}
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <CheckBoxComponent
                            text='Ghi nhớ'
                            checked={isRemember}
                            onChange={setIsRemember}
                        />
                        <ButtonComponent
                            text='Quên mật khẩu?'
                            textStyles={styles.textForget}
                        />
                    </View>
                    <ButtonComponent
                        type='primary'
                        text='Đăng nhập'
                        onPress={handleLogin}
                        textStyles={styles.buttonLoginText}
                        styles={styles.buttonLogin}
                        bgColor={Colors.Sky}
                        bgColorPress={Colors.SkyPress}
                    />
                    {/* Register link */}
                    <View style={styles.registerLinkView}>
                        <Text>Bạn chưa có tài khoản?</Text>
                        <ButtonComponent
                            type='link'
                            text='Đăng ký'
                            onPress={() => navigation.navigate("Register")}
                            textStyles={styles.registerLinkText}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

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
