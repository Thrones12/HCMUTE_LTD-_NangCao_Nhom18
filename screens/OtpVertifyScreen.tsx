import { View, TextInput } from "react-native";
import React, { useState } from "react";

const OtpVertifyScreen = () => {
    const [otp, setOTP] = useState("");

    const handleSubmit = () => {
        console.log(otp);
    };
    return (
        <View>
            <TextInput
                value={otp}
                onChangeText={(newValue) => setOTP(newValue)}
                onSubmitEditing={() => handleSubmit()}
            />
        </View>
    );
};

export default OtpVertifyScreen;
