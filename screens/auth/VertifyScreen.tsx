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
import axios from "axios";

const VertifyScreen = ({ navigation, route }: any) => {
    const API = Constant.API;
    const { vertify, regeneratePassword } = useContext(AuthContext);
    const { email, type, data } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [vertifyOtp, setVertifyOtp] = useState();

    const [otp, setOTP] = useState(["", "", "", ""]);
    const input1 = useRef<TextInput>(null);
    const input2 = useRef<TextInput>(null);
    const input3 = useRef<TextInput>(null);
    const input4 = useRef<TextInput>(null);

    useEffect(() => {
        if (!email) navigation.navigate("Login");
    }, [email]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API}/user/get-otp?email=${email}`);
            setVertifyOtp(res.data.data);
        };
        fetchData();
    }, []);

    const handleChangeOTP = (index: number, value: string) => {
        // Chỉ cho phép nhập số
        if (!/^\d?$/.test(value)) return;

        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const inputOTP = otp.join("");
            console.log(type);
            const res = await vertify(vertifyOtp, inputOTP, email, type);

            if (res) {
                if (type === "profile") {
                    const formData = new FormData();
                    formData.append("_id", data._id);
                    formData.append("fullname", data.fullname);
                    formData.append("phone", data.phone);
                    formData.append("email", data.email);
                    formData.append("password", data.password);

                    if (data.avatar && !data.avatar.includes("cloudinary")) {
                        formData.append("image", {
                            uri: data.avatar,
                            type: "image/jpeg",
                            name: "avatar.jpg",
                        } as any);
                    }
                    const res = await axios.put(`${API}/user`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    navigation.navigate("Main", {
                        screen: "Profile",
                    });
                } else {
                    navigation.navigate("Login");
                }
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("Lỗi vertify");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={GStyles.container}
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
                            value={otp[0]}
                            onChangeText={(text) => handleChangeOTP(0, text)}
                            styles={styles.inputText}
                            ref={input1}
                        />
                        <InputTextComponent
                            value={otp[1]}
                            onChangeText={(text) => handleChangeOTP(1, text)}
                            styles={styles.inputText}
                            ref={input2}
                        />
                        <InputTextComponent
                            value={otp[2]}
                            onChangeText={(text) => handleChangeOTP(2, text)}
                            styles={styles.inputText}
                            ref={input3}
                        />
                        <InputTextComponent
                            value={otp[3]}
                            onChangeText={(text) => handleChangeOTP(3, text)}
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
