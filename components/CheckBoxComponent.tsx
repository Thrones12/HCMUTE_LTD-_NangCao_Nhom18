import { Colors } from "@/constants";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
    text: string;
    checked: boolean;
    onChange: (newValue: boolean) => void;
}

const CheckBoxComponent = (props: Props) => {
    const { text, checked, onChange } = props;

    return (
        <Pressable style={styles.container} onPress={() => onChange(!checked)}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked}
            </View>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.LightGray1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checked: {
        backgroundColor: Colors.Gray,
        borderColor: Colors.Gray,
    },
    text: { fontSize: 14 },
});

export default CheckBoxComponent;
