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
import {
    ButtonComponent,
    CheckBoxComponent,
    InputTextComponent,
} from "@/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { Login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemember, setIsRemember] = useState(false);

    // Tạo ref cho input password
    const passwordInputRef = useRef<TextInput>(null);

    // Xử lí đăng nhập
    const handleLogin = async () => {
        setLoading(true);
        const res = await Login(email, password);
        if (res === 2) {
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
                        text: "Xác thực",
                        onPress: () => {
                            navigation.navigate("Verify", {
                                email,
                                type: "Activate",
                            });
                        },
                    },
                ]
            );
        }
        setLoading(false);
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Loading */}
                {loading === true ? (
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
                    <Text style={styles.titleText}>Đăng nhập</Text>
                </View>
                {/* Input view */}
                <View style={styles.inputView}>
                    <InputTextComponent
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                        returnKeyType='next'
                        onSubmitEditing={() =>
                            passwordInputRef.current?.focus()
                        } // Chuyển focus
                        styles={styles.inputText}
                    />
                    <InputTextComponent
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Mật khẩu'
                        secureTextEntry
                        returnKeyType='done'
                        ref={passwordInputRef}
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
                            onPress={() =>
                                navigation.navigate("ForgetPassword")
                            }
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
    inputText: {
        backgroundColor: Colors.Gray200,
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
