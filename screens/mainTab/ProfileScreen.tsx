import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
// import Header from '../components/Header';
import { Avatar, Button, List } from "react-native-paper";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* <Header />*/}
            <View style={styles.header}>
                <Avatar.Image
                    source={{ uri: "https://via.placeholder.com/100" }}
                    size={100}
                />
                <Text style={styles.name}>Nguyễn Anh Hào</Text>
                <Text style={styles.username}>anhhao1307</Text>
                <Text style={styles.grade}>Khối 9</Text>
                <Text style={styles.status}>Học sinh tự do</Text>
            </View>
            <View style={styles.menu}>
                <List.Item
                    title='Cập nhật ảnh đại diện'
                    left={() => <List.Icon icon='camera' />}
                />
                <List.Item
                    title='Thông tin tài khoản'
                    left={() => <List.Icon icon='account' />}
                />
                <List.Item
                    title='Bài tập đã đánh dấu'
                    left={() => <List.Icon icon='pen' />}
                />
                <List.Item
                    title='Khóa học của bạn'
                    left={() => <List.Icon icon='book' />}
                />

                <List.Item
                    title='Đổi mật khẩu'
                    left={() => <List.Icon icon='lock' />}
                />
                <List.Item
                    title='Xóa tài khoản'
                    left={() => <List.Icon icon='delete' />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#E5F4E3" },
    header: { alignItems: "center", padding: 20, backgroundColor: "#4CAF50" },
    name: { fontSize: 20, fontWeight: "bold", color: "white", marginTop: 10 },
    username: { fontSize: 16, color: "white" },
    grade: { fontSize: 14, color: "white", marginTop: 5 },
    status: {
        fontSize: 14,
        color: "white",
        backgroundColor: "#388E3C",
        padding: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    menu: { backgroundColor: "white", marginTop: 10 },
});

export default ProfileScreen;
