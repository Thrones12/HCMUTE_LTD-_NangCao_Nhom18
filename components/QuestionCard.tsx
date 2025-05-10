import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants";
import { Audio } from "expo-av";

const Option = ({ text, onPress, index, select, answer }: any) => {
    const [isSelect, setIsSelect] = useState(false);
    useEffect(() => {
        setIsSelect(select === index);
    }, [select]);
    return (
        <Pressable
            style={[
                styles.option,
                {
                    backgroundColor: isSelect
                        ? text === answer
                            ? Colors.Green
                            : Colors.Red
                        : Colors.Gray300,
                },
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.optionText,
                    {
                        color: isSelect ? Colors.White : Colors.Gray800,
                    },
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
};

const QuestionCard = ({ item, index }: any) => {
    const [select, setSelect] = useState(-1);
    const onPress = (index: any) => {
        setSelect(index);
        if (item.options[index] === item.answer) playSuccessSound();
        else playWrongSound();
    };
    const playSuccessSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/success.mp3") // Sử dụng require để truy cập tệp âm thanh cục bộ
        );
        await sound.playAsync();
    };
    const playWrongSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/wrong.mp3") // Sử dụng require để truy cập tệp âm thanh cục bộ
        );
        await sound.playAsync();
    };
    const convertLevel = (level: string) => {
        return level === "Easy"
            ? "Nhận biết"
            : level === "Medium"
            ? "Thông hiểu"
            : level === "Hard"
            ? "VD"
            : "VDC";
    };
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.questionText}>
                    Câu {index} {"["}
                    {convertLevel(item.level)}
                    {"]"}: {item.question}
                </Text>
                <View style={styles.optionsContainer}>
                    {item.options.map((option: string, index: number) => (
                        <Option
                            key={index}
                            index={index}
                            text={option}
                            onPress={() => onPress(index)}
                            select={select}
                            answer={item.answer}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    item: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    optionsContainer: {
        gap: 10,
    },
    option: {
        padding: 12,
        borderRadius: 8,
    },
    optionText: {
        fontSize: 16,
    },
});

export default QuestionCard;
