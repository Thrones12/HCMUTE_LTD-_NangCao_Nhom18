import {
    TextInput,
    StyleProp,
    TextStyle,
    KeyboardTypeOptions,
    TextInputProps,
} from "react-native";
import React, { forwardRef } from "react";
import { Colors } from "@/constants";

interface Props extends TextInputProps {
    value: string;
    onChangeText: (newValue: string) => void;
    placeholder?: string;
    styles?: StyleProp<TextStyle>;
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    editable?: boolean;
}

const InputTextComponent = forwardRef<TextInput, Props>(
    (
        {
            value,
            onChangeText,
            placeholder,
            styles,
            backgroundColor = "#fff",
            color = "#000",
            fontFamily,
            fontSize = 14,
            editable = true,
            keyboardType,
            returnKeyType,
            secureTextEntry,
            onSubmitEditing,
            ...restProps
        },
        ref
    ) => {
        return (
            <TextInput
                ref={ref} // ✅ Dùng `forwardRef` để hỗ trợ ref
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[
                    {
                        backgroundColor,
                        color,
                        fontSize,
                        fontFamily,
                        borderRadius: 8,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.LightGray1,
                        flex: 1, // Giúp component mở rộng nếu cần
                    },
                    styles,
                ]}
                editable={editable}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                onSubmitEditing={onSubmitEditing}
                {...restProps}
            />
        );
    }
);

export default InputTextComponent;
