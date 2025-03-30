import {
    TextInput,
    StyleProp,
    TextStyle,
    KeyboardTypeOptions,
    TextInputProps,
} from "react-native";
import React from "react";
import { Colors } from "@/constants";

interface Props {
    value: string;
    onChangeText: (newValue: string) => void;
    placeHolder?: string;
    styles?: StyleProp<TextStyle>;
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    editable?: boolean;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: TextInputProps["returnKeyType"];
    secureTextEntry?: boolean;
    onSubmitEditing?: () => void;
    inputRef?: React.RefObject<TextInput>;
}

const InputTextComponent: React.FC<Props> = ({
    value,
    onChangeText,
    placeHolder,
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
    inputRef,
    ...restProps
}) => {
    return (
        <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeHolder}
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
};

export default InputTextComponent;
