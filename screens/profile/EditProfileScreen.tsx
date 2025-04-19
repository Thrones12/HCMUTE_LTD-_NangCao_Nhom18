import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface EditProfileScreenProps {
  navigation: { goBack: () => void };
  route: {
    params: {
      name: string;
      grade: string;
      status: string;
      onSave: (data: { name: string; grade: string; status: string }) => void;
    };
  };
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { name: initName, grade: initGrade, status: initStatus, onSave } =
    route.params;

  const [name, setName] = useState<string>(initName);
  const [grade, setGrade] = useState<string>(initGrade);
  const [status, setStatus] = useState<string>(initStatus);

  const handleSave = () => {
    if (!name || !grade || !status) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    onSave({ name, grade, status });
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa thông tin</Text>
      </View>

      <Text style={styles.label}>Tên</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên"
      />

      <Text style={styles.label}>Khối</Text>
      <TextInput
        style={styles.input}
        value={grade}
        onChangeText={setGrade}
        placeholder="Nhập khối"
      />

      <Text style={styles.label}>Loại học sinh</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Nhập loại học sinh"
      />

      <View style={styles.buttonContainer}>
        <Button title="Lưu thông tin" onPress={handleSave} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  buttonContainer: { marginTop: 30 },
});

export default EditProfileScreen;
