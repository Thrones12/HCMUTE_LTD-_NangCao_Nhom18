import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";
import { Colors, Constant, GStyles } from "@/constants";
import Noti from "@/utils/Noti";

const ProfileScreen = ({ navigation }: any) => {
    const API = Constant.API;
    const { Logout, userId } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [backup, setBackup] = useState({ email: "", phone: "" }); // để kiểm tra xem email hoặc phone có bị thay đổi không
    const [avatar, setAvatar] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("********");

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API}/user/get-one?id=${userId}`);
            let data = res.data.data;
            setBackup({ email: data.email, phone: data.phone });
            setAvatar(data.avatar);
            setFullname(data.fullname);
            setEmail(data.email);
            setPhone(data.phone);
        };
        fetchData();
    }, [userId]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.canceled) {
            // chỉ set ảnh preview trước
            setAvatar(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (email !== backup.email || phone !== backup.phone) {
            navigation.navigate("Vertify", {
                email: backup.email,
                type: "Update",
                onVerified: async () => {
                    await update({
                        userId,
                        fullname,
                        phone,
                        email,
                        password,
                        avatar,
                    });
                },
            });
        } else {
            await update({ userId, fullname, phone, email, password, avatar });
        }
    };
    const update = async ({
        userId,
        fullname,
        phone,
        email,
        password,
        avatar,
    }: any) => {
        try {
            const formData = new FormData();
            formData.append("_id", userId);
            formData.append("fullname", fullname);
            formData.append("phone", phone);
            formData.append("email", email);
            if (password !== "********") {
                formData.append("password", password);
            }

            if (avatar && !avatar.includes("cloudinary")) {
                formData.append("image", {
                    uri: avatar,
                    type: "image/jpeg",
                    name: "avatar.jpg",
                } as any);
            }

            setLoading(true);
            const res = await axios.put(`${API}/user`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setPassword("********");
            setLoading(false);
            Alert.alert(
                "Cập nhật thành công",
                "Thông tin người dùng đã được lưu."
            );
        } catch (err: any) {
            Noti.error(err.data.message);
        }
    };
    return (
        <ScrollView style={[GStyles.container, { padding: 15 }]}>
            {/* Loading */}
            {loading === true ? (
                <View style={styles.indicator}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            ) : null}
            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={pickImage}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Text style={{ color: "#999" }}>Chọn ảnh</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder='Họ và tên'
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Số điện thoại'
                keyboardType='phone-pad'
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder='Mật khẩu mới'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Lưu thông tin</Text>
            </Pressable>
            <Pressable
                style={[styles.button, { backgroundColor: Colors.Gray400 }]}
                onPress={Logout}
            >
                <Text style={[styles.buttonText, { color: Colors.Gray800 }]}>
                    Đăng xuất
                </Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ccc",
    },
    avatarPlaceholder: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: Colors.Gray600,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: Colors.White,
        elevation: 2,
    },
    indicator: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
        zIndex: 999,
    },
    button: {
        padding: 8,
        backgroundColor: Colors.Blue500,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        elevation: 2,
    },
    buttonText: {
        color: Colors.White,
        fontSize: 18,
        fontWeight: 600,
    },
});

export default ProfileScreen;
