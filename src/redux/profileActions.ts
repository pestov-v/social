import { ThunkAction } from 'redux-thunk'
import utils from '../utils/formatText'

import { ResultCode } from '../types/resultCodes'
import { ActionTypes } from '../types/app'
import { TProfile, TProfileType, ProfileType } from '../types/profile'

import { TStore } from './store'
import profileAPI from '../api/profileAPI'
import { defaultProfile } from './profileReducer'

export const ADD_POST = 'PROFILE/ADD_POST'
export const CHANGE_POST = 'PROFILE/CHANGE_POST'
export const DELETE_POST = 'PROFILE/DELETE_POST'
export const SET_PROFILE = 'PROFILE/SET_PROFILE'
export const SET_STATUS = 'PROFILE/SET_STATUS'
export const SET_PHOTO = 'PROFILE/SET_PHOTO'
export const LOADING_DATA = 'PROFILE/LOAD_DATA'
export const SET_IS_FOLLOW = 'PROFILE/SET_IS_FOLLOW'

const actions = {
    addPost: (text: string) => ({ type: ADD_POST, payload: text } as const),
    changePost: (id: string, text: string) => ({ type: CHANGE_POST, payload: {id, text} } as const),
    deletePost: (id: string) => ({ type: DELETE_POST, payload: id } as const),
    setProfile: (profile: TProfile, typeProfile: TProfileType = ProfileType.Other) =>
                        ({ type: SET_PROFILE, payload: {profile, typeProfile} } as const),
    setStatusToState: (status: string | null) => ({ type: SET_STATUS, payload: status } as const),
    setPhoto: (photo: File | null) => ({ type: SET_PHOTO, payload: photo } as const),
    setLoadingData: (value: boolean) => ({ type: LOADING_DATA, payload: value } as const),
    setIsFollow: (value: boolean) => ({ type: SET_IS_FOLLOW, payload: value } as const)
}

export type TProfileActions = ActionTypes<typeof actions>
type TThunkResult<R> = ThunkAction<R, TStore, null, TProfileActions>

export const getProfile = (userId: number, typeProfile: TProfileType = ProfileType.Other):TThunkResult<Promise<void>> => async (dispatch, getState) => {
    dispatch(actions.setLoadingData(true))
    const {profile: {userProfile, ownerProfile}} = getState()
    if (userProfile.userId !== userId) {
        if (ownerProfile.userId === userId) {
            dispatch(actions.setProfile(ownerProfile))
        } else {
            const res = await dispatch(getProfileInfo(userId))
            typeof res !== 'string' &&
                dispatch(actions.setProfile( utils.changeEmptyValues(res) as TProfile, typeProfile ))
            dispatch(getIsFollow(userId))
        }
    }
    await dispatch(getStatus(userId))
    dispatch(actions.setLoadingData(false))
}
export const updateProfileInfo = (): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const userId = getState().auth.userId
        if (userId) {
            const res = await profileAPI.getProfile(userId)
            if (typeof res !== 'string' && !(res instanceof Error)) {
                dispatch(actions.setProfile( utils.changeEmptyValues(res) as TProfile, ProfileType.Owner ))
                dispatch(actions.setProfile( utils.changeEmptyValues(res) as TProfile ))
            }
        }
    } catch (e) {

    }
}
export const getProfileInfo = (userId: number): TThunkResult<Promise<TProfile>> => async () => {
    try {
        const res = await profileAPI.getProfile(userId)
        if (typeof res !== 'string' && !(res instanceof Error))
            return res
        return defaultProfile
    } catch (e) {
        return defaultProfile
    }
}
export const setProfileInfo = (data: TProfile = defaultProfile): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const isAuth = getState().auth.isAuth
        if (isAuth) {
            const res = await profileAPI.setProfileInfo(data)
            if (res === ResultCode.Success) {
                dispatch(updateProfileInfo())
            }
        }
    } catch (e) {

    }
}
export const setProfilePhoto = (photo: File | null): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const isAuth = getState().auth.isAuth
        if (isAuth) {
            const res = await profileAPI.setPhoto(photo)
            if (typeof res === 'number') {
                dispatch(updateProfileInfo())
            }
        }
    } catch (e) {

    }
}

export const getStatus = (userId: number):TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const res = await profileAPI.getStatus(userId)
        typeof res !== 'number' && !(res instanceof Error) && dispatch(actions.setStatusToState(res))        
    } catch (e) {
        console.log(e.message)
    }
}
export const setStatus = (status: string):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const res = await profileAPI.setStatus(status)
        if (res === ResultCode.Success) {
            dispatch(actions.setStatusToState(status))
        }
    } catch (e) {
        console.log(e.message)
    }
}

export const addPost = (text: string):TThunkResult<ResultCode> => (dispatch) => {
    dispatch(actions.addPost(text))
    return ResultCode.Success
}
export const getIsFollow = (userId: number): TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const res = await profileAPI.getIsFollow(userId)
        typeof res === 'boolean' && dispatch(actions.setIsFollow(res))
    } catch (e) {
        console.log(e.message)
    }
}

export default actions