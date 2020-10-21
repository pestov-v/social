import {TAuthActions, SET_IS_AUTH, SET_USER_DATA, SET_CAPTCHA_URL} from './authActions'

const initialState = {
    isAuth: false,
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    captchaUrl: null as null | string
}

export type TAuthState = typeof initialState

const authReducer = (state = initialState, action: TAuthActions):TAuthState => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case SET_USER_DATA:
            return {
                ...state,
                userId: action.payload.userId,
                email: action.payload.email,
                login: action.payload.login,
                isAuth: action.payload.isAuth
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.payload.url
            }

        default:
            return state
    }
}

export default authReducer
