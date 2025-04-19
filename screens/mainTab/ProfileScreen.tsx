import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageURISource,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, List } from "react-native-paper";
import SearchComponent from "../../components/SearchComponent";


const CLOUDINARY_CLOUD_NAME = "dxyy2rgm4";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_preset";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface ProfileScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (
      screen: string,
      params?: {
        name: string;
        grade: string;
        status: string;
        onSave: (data: { name: string; grade: string; status: string }) => void;
      }
    ) => void;
  };
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [avatar, setAvatar] = useState<string>("https://via.placeholder.com/100");
  const [name, setName] = useState<string>("Nguyễn Anh Hào");
  const [grade, setGrade] = useState<string>("Khối 9");
  const [status, setStatus] = useState<string>("Học sinh tự do");

  const pickAndUploadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Bạn cần cho phép truy cập thư viện ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      uploadImageToCloudinary(imageUri);
    }
  };

  const uploadImageToCloudinary = async (imageUri: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "avatar.jpg",
    } as any); // Cast để tránh lỗi TS về loại FormData

    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_API, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setAvatar(data.secure_url);
        Alert.alert("Thành công", "Ảnh đại diện đã được cập nhật!");
      } else {
        throw new Error("Không nhận được đường dẫn ảnh.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Lỗi", "Tải ảnh lên thất bại.");
    }
  };

  return (
    <View style={styles.container}>
      <SearchComponent onBackPress={() => navigation.goBack()} />

      <View style={styles.header}>
        <Avatar.Image source={{ uri: avatar } as ImageURISource} size={100} />
        <Text style={styles.username}>anhhao1307</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.grade}>{grade}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      <View style={styles.menu}>
        <List.Item
          title="Cập nhật ảnh đại diện"
          onPress={pickAndUploadImage}
          left={() => <List.Icon icon="camera" />}
        />
        <List.Item
          title="Chỉnh sửa thông tin"
          onPress={() =>
            navigation.navigate("EditProfile", {
              name,
              grade,
              status,
              onSave: ({ name, grade, status }) => {
                setName(name);
                setGrade(grade);
                setStatus(status);
              },
            })
          }
          left={() => <List.Icon icon="account" />}
        />
        <List.Item title="Bài tập đã đánh dấu" left={() => <List.Icon icon="pen" />} />
        <List.Item title="Khóa học của bạn" left={() => <List.Icon icon="book" />} />
        <List.Item title="Đổi mật khẩu" left={() => <List.Icon icon="lock" />} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5F4E3" },
  header: { alignItems: "center", padding: 20, backgroundColor: "#4CAF50" },
  username: { fontSize: 16, color: "white" },
  name: { fontSize: 20, fontWeight: "bold", color: "white", marginTop: 5 },
  grade: { fontSize: 14, color: "white", marginTop: 5 },
  status: {
    fontSize: 14,
    color: "white",
    backgroundColor: "#388E3C",
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  menu: { backgroundColor: "#FAFAD2", marginTop: 10 },
});

export default ProfileScreen;
