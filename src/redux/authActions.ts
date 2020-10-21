import { ThunkAction } from 'redux-thunk'
import { TStore } from './store'
import authAPI from '../api/authAPI'
import { getProfile, setProfileInfo, setProfilePhoto } from './profileActions'
import { unmount as unmountDialogs } from './dialogsActions'
import { defaultProfile } from './profileReducer'
import { ResultCode, ResultCodeForCaptcha } from '../types/resultCodes'
import { ActionTypes, Nullable } from '../types/app'
import { ProfileType } from '../types/profile'

export const SET_IS_AUTH = 'AUTH/SET_IS_AUTH'
export const SET_USER_DATA = 'AUTH/SET_USER_DATA'
export const SET_CAPTCHA_URL = 'AUTH/SET_CAPTCHA_URL'

type TUserData = {
    userId: Nullable<number>
    email: Nullable<string>
    login: Nullable<string>
    isAuth: boolean
}

export type TAuthActions = ActionTypes<typeof actions>
export type TThunkResult<R> = ThunkAction<R, TStore, null, TAuthActions>

const actions = {
    setIsAuth: (value: boolean) => ({ type: SET_IS_AUTH, payload: value } as const),
    setCaptchaUrl: (url: Nullable<string>) => ({ type: SET_CAPTCHA_URL, payload: {url} } as const),
    setUserData: (userId: Nullable<number>, email: Nullable<string>, login: Nullable<string>, isAuth: boolean) =>
        ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth} as TUserData } as const)
}

export const auth = ():TThunkResult<Promise<number>> => async (dispatch) => {
    try {
        const response = await authAPI.me()
        if (response.resultCode === ResultCode.Error) {
            return ResultCode.Error
        } else {
            const {data: {id, email, login}} = response
            dispatch(actions.setUserData(id, email, login, true))
            dispatch(getProfile(id, ProfileType.Owner))
            return ResultCode.Success
        }
    } catch (e) {
        return ResultCode.Error
    }
}

export const login = (email: string, password: string, rememberMe: boolean = false, captcha: Nullable<string> = null):TThunkResult<Promise<number | string>> =>
    async (dispatch, getState) => {
        try {
            const { auth: {captchaUrl} } = getState()
            const response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.resultCode === ResultCode.Success) {
                await dispatch(auth())
                captchaUrl && dispatch(actions.setCaptchaUrl(null))
                return ResultCode.Success
            } else if (response.resultCode === ResultCodeForCaptcha.Captcha) {
                await dispatch(setCaptchaUrl())
            }
            return response.messages[0]

        } catch (e) {
            return ResultCode.Error
        }
    }
export const logout = ():TThunkResult<Promise<number>> => async (dispatch) => {
    try {
        const response = await authAPI.logout()
        if (response.resultCode === ResultCode.Success) {
            dispatch(actions.setUserData(null, null, null, false))
            dispatch(setProfileInfo(defaultProfile))
            dispatch(setProfilePhoto(null))
            dispatch(unmountDialogs())
            return ResultCode.Success
        }
        return ResultCode.Error
    } catch (e) {
        console.log(e)
        return ResultCode.Error
    }
}

export const setCaptchaUrl = ():TThunkResult<Promise<void>> => async (dispatch) => {
    const res = await authAPI.getCaptcha()
    dispatch(actions.setCaptchaUrl(res.data.url))
}

export default actions