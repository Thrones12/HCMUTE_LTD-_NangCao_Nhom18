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
import React, { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Colors, GStyles, Constant } from "@/constants";
import {
    ButtonComponent,
    CheckBoxComponent,
    InputTextComponent,
} from "@/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import Noti from "@/utils/Noti";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const VertifyScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const { SendOtp, ActivateAccount, SendPassword } = useContext(AuthContext);
    const { email, type } = route.params || {};
    // State
    const [loading, setLoading] = useState(false);
    const [OTP, setOTP] = useState<any>();
    const [input, setInput] = useState(["", "", "", ""]);
    // Ref
    const input1 = useRef<TextInput>(null);
    const input2 = useRef<TextInput>(null);
    const input3 = useRef<TextInput>(null);
    const input4 = useRef<TextInput>(null);
    // Kiểm tra email
    useEffect(() => {
        const sendOTP = async (email: any) => {
            const res = await SendOtp(email);
            setOTP(res.toString());
            Noti.success("OTP đã được gửi về mail");
        };
        // Không có email thì quay về login
        if (!email) navigation.navigate("Login");
        // Có email thì gửi otp về mail
        else {
            sendOTP(email);
        }
    }, [email]);
    // Xử lí nhập OTP
    const handleChangeInput = (index: number, value: string) => {
        // Chỉ cho phép nhập số
        if (!/^\d?$/.test(value)) return;

        const newInput = [...input];
        newInput[index] = value;
        setInput(newInput);

        // Chuyển focus sang ô tiếp theo (nếu có)
        if (value && index === 0) {
            input2.current?.focus();
        }
        if (value && index === 1) {
            input3.current?.focus();
        }
        if (value && index === 2) {
            input4.current?.focus();
        }
    };
    // Xử lí xác thực
    const handleSubmit = async () => {
        setLoading(true);
        if (OTP === input.join("")) {
            if (type === "Activate") {
                Noti.success("Xác thực thành công");
                ActivateAccount(email);
            } else if (type === "Forget") {
                Noti.success("Mật khẩu mới đã được gửi về mail");
                SendPassword(email);
            } else if (type === "Update") {
                Noti.success("Cập nhập thành công");
                //SendPassword(email);
            }
            navigation.navigate("Login");
        } else {
            Noti.info("OTP không đúng");
        }
        setLoading(false);
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
                    <Text style={styles.titleText}>Xác thực</Text>
                </View>
                {/* Input view */}
                <View style={styles.inputView}>
                    <View style={styles.VertifyView}>
                        <InputTextComponent
                            value={input[0]}
                            onChangeText={(text) => handleChangeInput(0, text)}
                            styles={styles.inputText}
                            ref={input1}
                        />
                        <InputTextComponent
                            value={input[1]}
                            onChangeText={(text) => handleChangeInput(1, text)}
                            styles={styles.inputText}
                            ref={input2}
                        />
                        <InputTextComponent
                            value={input[2]}
                            onChangeText={(text) => handleChangeInput(2, text)}
                            styles={styles.inputText}
                            ref={input3}
                        />
                        <InputTextComponent
                            value={input[3]}
                            onChangeText={(text) => handleChangeInput(3, text)}
                            styles={styles.inputText}
                            ref={input4}
                        />
                    </View>
                    <ButtonComponent
                        type='primary'
                        text='Xác nhận'
                        textStyles={styles.buttonLoginText}
                        styles={styles.buttonLogin}
                        bgColor={Colors.Sky}
                        bgColorPress={Colors.SkyPress}
                        onPress={() => handleSubmit()}
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

export default VertifyScreen;

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
    VertifyView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 25,
    },
    inputText: {
        backgroundColor: Colors.LightGray2,
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
