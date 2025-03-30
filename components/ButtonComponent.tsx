import {
    TouchableOpacity,
    StyleProp,
    Text,
    TextStyle,
    ViewStyle,
    Pressable,
} from "react-native";
import React from "react";
import { Colors, GStyles } from "@/constants";

interface Props {
    type?: "primary" | "link";
    text: string;
    onPress?: () => void;
    textStyles?: StyleProp<TextStyle>;
    styles?: StyleProp<ViewStyle>;
    bgColor?: string;
    bgColorPress?: string;
}

const ButtonComponent = (props: Props) => {
    const { type, text, onPress, textStyles, styles, bgColor, bgColorPress } =
        props;
    return type === "primary" ? (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles,
                { backgroundColor: pressed ? bgColor : bgColorPress },
            ]}
        >
            <Text style={[textStyles]}>{text}</Text>
        </Pressable>
    ) : (
        <Pressable onPress={onPress}>
            <Text style={[textStyles]}>{text}</Text>
        </Pressable>
    );
};

export default ButtonComponent;
