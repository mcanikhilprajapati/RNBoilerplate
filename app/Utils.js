import {Toast} from "native-base";
import {Dimensions} from "react-native";

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;


export const ToastType = {
    DANGER: 'danger', SUCCESS: 'success', WARNING: 'warning', NORMAL: 'normal'
};
export const ToastPosition = {
    TOP: 'top'
};
export const showToast = (message, type?) => {
    Toast.show({text: message, position: 'top', type: type,duration: 3000})
};


