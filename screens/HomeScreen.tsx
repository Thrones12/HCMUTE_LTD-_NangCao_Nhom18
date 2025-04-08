import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { GStyles } from "@/constants";
import { CategoryItemComponent } from "@/components";

let categories = [
    { name: "Frontend", icon: "home-outline" },
    { name: "Backend", icon: "home-outline" },
    { name: "DevOps", icon: "home-outline" },
    { name: "FullStack", icon: "home-outline" },
    { name: "Android", icon: "home-outline" },
    { name: "DataAnalyst", icon: "home-outline" },
];

const HomeScreen = ({ navigation }: any) => {
    const { user, logout } = useContext(AuthContext);
    return (
        <View style={[GStyles.container, styles.wrapper]}>
            <Text>HomeScreen</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>Khóa học</Text>
                <View style={styles.cateView}>
                    {categories.map((cate, index) => (
                        <CategoryItemComponent
                            key={index}
                            name={cate.name}
                            icon={cate.icon}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    cateView: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
});

export default HomeScreen;
