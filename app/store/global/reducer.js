import * as types from './actionTypes'

const initialState = {
    loading: false,
    isInternetConnected:true
};
const login = (state = initialState, action) => {

    switch (action.type) {
        case types.API_LOADING_START:
            return {...state, loading: true};
        case types.API_LOADING_STOP:
            return {...state, loading: false};
        case types.IS_INTERNET_CONNECTED:
            console.warn(action.payload)
            if(action.payload===false){
                return {...state, isInternetConnected: action.payload, loading: false};
            }else{
                return {...state, isInternetConnected: action.payload};
            }
        default:
            return state
    }
};

export default login
