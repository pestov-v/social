import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { TUser } from '../types/users'
import { TStore } from './store'
import usersAPI from '../api/usersAPI'
import { ActionTypes } from '../types/app'
import { ResultCode } from '../types/resultCodes'
import { getIsFollow } from './profileActions'

export const LOADING_DATA = 'USERS/LOADING_DATA'
export const SET_USERS = 'USERS/SET_USERS'
export const ADD_USERS = 'USERS/ADD_USERS'
export const SET_PAGE_NUMBER = 'USERS/SET_PAGE_NUMBER'
export const SET_PAGE_SIZE = 'USERS/SET_PAGE_SIZE'
export const SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT'
export const SET_ERROR = 'USERS/SET_ERROR'
export const SET_IS_FOLLOW = 'USER/SET_IS_FOLLOW'
export const SET_FOLLOWING_IN_PROGRESS = 'USER/SET_FOLLOWING_IN_PROGRESS'

const actions = {
    setLoading: (value: boolean) => ({type: LOADING_DATA, payload: value} as const) ,
    setUsersItems: (value: Array<TUser>) => ({type: SET_USERS, payload: value} as const),
    addUsersItems: (value: Array<TUser>) => ({type: ADD_USERS, payload: value} as const),
    setPageNumber: (value: number) => ({type: SET_PAGE_NUMBER, payload: value} as const),
    setPageSize: (value: number) => ({type: SET_PAGE_SIZE, payload: value} as const),
    setTotalCount: (value: number) => ({type: SET_TOTAL_COUNT, payload: value} as const),
    setError: (value: Array<string>) => ({type: SET_ERROR, payload: value} as const),
    setIsFollow: (userId: number, value: boolean) => ({type: SET_IS_FOLLOW, payload: {userId, value}} as const),
    followingInProgres: (userId: number, type: 'start' | 'end') => ({
                            type: SET_FOLLOWING_IN_PROGRESS, payload: { userId, type }
                        } as const)
}
export type TUsersActions = ActionTypes<typeof actions>
export type TThunkResult<R> = ThunkAction<R, TStore, null, TUsersActions>


export const initialization = (): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    const pageSize = getState().users.pageSize    
    await dispatch(getUsers(1, pageSize))
}
export const unmount = (): TThunkResult<void> => (dispatch) => {
    dispatch(actions.setUsersItems([]))
    dispatch(actions.setPageNumber(1))
    dispatch(actions.setTotalCount(0))
    dispatch(actions.setError([]))
}
export const getUsers = (pageNumber: number, pageSize: number = 8) :TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const { loading } = getState().users
        if (!loading) {
            dispatch(actions.setLoading(true))
            const res = await usersAPI.getUsers(pageSize, pageNumber)
            if (typeof res !== 'number') {
                dispatch(actions.addUsersItems(res.items))
                dispatch(actions.setTotalCount(res.totalCount))
                dispatch(actions.setError(res.error))
            } 
            dispatch(actions.setLoading(false))
        }
    } catch (e) {
        console.log(e.messages)
    }
}
export const setNextPage = (): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    const {pageNumber: page, pageSize} = getState().users
    dispatch(actions.setPageNumber(page + 1))
    await dispatch(getUsers(page + 1, pageSize))
} 
const following = async (following: boolean = true, userId: number, dispatch: Dispatch) => {
    dispatch(actions.followingInProgres(userId, 'start'))
    if (following) {
        const response = await usersAPI.unfollow(userId)
        if (response === ResultCode.Success) {
            dispatch(actions.setIsFollow(userId, false))
        }
    } else {
        const response = await usersAPI.follow(userId)
        if (response === ResultCode.Success) {
            dispatch(actions.setIsFollow(userId, true))
        }
    }
    dispatch(actions.followingInProgres(userId, 'end'))
}
export const setFollowing = (userId: number): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const {items} = getState().users
        if (items.length) {
            following(items.find(i => i.id === userId)?.followed, userId, dispatch)                
        } else {
            const { isFollow } = getState().profile
            await following(isFollow, userId, dispatch)
            dispatch(getIsFollow(userId))                
        }
    } catch (e) {
        console.log(e.message)
    }
}

export default actions