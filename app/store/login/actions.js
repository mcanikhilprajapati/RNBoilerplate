import * as types from './actionTypes'
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {API, ContentType, Method, SessionManager} from "react-native-gtlcomponent";
import {endPoints, SesstionKey} from "app/Constants";
import {ToastType, showToast} from "app/Utils";


export const loginUser = (params, {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        const headers = {
            'type': ContentType.applicationjson
        };
        dispatch(loginLoadingStart());
        API.getInstance().Fetch(endPoints.login, headers, params, false,
            {
                SuccessCallback: response => {
                    dispatch(loginLoadingStop());

                    SessionManager.storeKeyValue(SesstionKey.USERS, JSON.stringify(response.Data)).then(() => {
                        SuccessCallback(response);
                    })

                },
                FailureCallback: response => {
                    dispatch(loginLoadingStop());
                    FailureCallback(response);
                    showToast(JSON.stringify(response.data.Data), ToastType.DANGER)
                }
            })


    }
};
export const getProfile = (data) => {
    return (dispatch) => {

        dispatch({type: types.SET_PROFILE, payload: data})

    }
};

const loginLoadingStart = () => ({type: types.API_LOADING_START});
const loginLoadingStop = () => ({type: types.API_LOADING_STOP});
