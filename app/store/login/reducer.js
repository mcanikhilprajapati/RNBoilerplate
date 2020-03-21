import * as types from './actionTypes'

const initialState = {
    data: {},
    loading: false,
}
const login = (state = initialState, action) => {

    switch (action.type) {
        case types.API_LOADING_START:
            return {...state, loading: true};
        case types.SET_PROFILE:
            return {...state, data:action.payload};
        case types.API_LOADING_STOP:
            return {...state, loading: false, otp: action.payload};
        case types.UPDATE_ACCESS_TOKEN:
            return {...state, token: action.payload};
        default:
            return state
    }
}

export default login
