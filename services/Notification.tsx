import Toast from "react-native-toast-message";

const success = (message: string) => {
    Toast.show({
        type: "success",
        text1: "Thành công",
        text2: message,
        position: "bottom",
    });
};

const error = (message: string) => {
    Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: message,
        position: "bottom",
    });
};

const info = (message: string) => {
    Toast.show({
        type: "info",
        text1: "Thông báo",
        text2: message,
        position: "bottom",
    });
};

export default {
    success,
    error,
    info,
};
