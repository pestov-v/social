import { ThunkAction } from 'redux-thunk'
import { TStore } from './store'

import { ActionTypes } from '../types/app'
import { ResultCode } from '../types/resultCodes'
import { ProfileType } from '../types/profile'

import { auth } from './authActions'
import { getProfile } from './profileActions'
import { getDialogs } from './dialogsActions'


export const SET_INITILIZATION = 'APP/SET_INITILIZATION'

export type TAppActions = ActionTypes<typeof actions>
export type TThunkResult<R> = ThunkAction<R, TStore, null, TAppActions>

export const initialization = ():TThunkResult<Promise<void>> => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth
    const response = await dispatch(auth())
    if (response === ResultCode.Success) {
        const userId = getState().auth.userId
        userId && await dispatch(getProfile(userId, ProfileType.Owner))
    }
    isAuth && await dispatch(getDialogs())
    dispatch(actions.setInitialization(false))
}

const actions = {
    setInitialization: (value: boolean) => ({ type: SET_INITILIZATION, payload: {value}} as const)
}

export default actions