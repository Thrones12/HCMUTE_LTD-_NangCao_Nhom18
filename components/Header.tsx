import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const Header = ({ title }: any) => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name='chevron-back' size={24} color='#000' />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 48, // đảm bảo chiều cao cố định để căn giữa
    },
    backButton: {
        position: "absolute",
        left: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: Colors.Gray800,
    },
});

export default Header;
