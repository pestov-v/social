import {TUser} from '../types/users'
import {
    TUsersActions,
    LOADING_DATA,
    SET_USERS,
    ADD_USERS,
    SET_PAGE_NUMBER,
    SET_PAGE_SIZE,
    SET_TOTAL_COUNT,
    SET_ERROR,
    SET_IS_FOLLOW,
    SET_FOLLOWING_IN_PROGRESS
} from './usersActions'

const initialState = {
    loading: false,
    items: [] as Array<TUser>,
    pageNumber: 1,
    pageSize: 8,
    totalCount: 0,
    error: null as null | Array<string>,
    followingInProgress: [] as Array<number>
}

export type TUsersState = typeof initialState

const usersReducer = (state = initialState, action: TUsersActions): TUsersState => {
    switch (action.type) {
        case LOADING_DATA: 
            return {
                ...state,
                loading: action.payload
            }
        case SET_USERS: 
            return {
                ...state,
                items: action.payload
            }
        case ADD_USERS: 
            return {
                ...state,
                items: state.items ? [...state.items, ...action.payload] : action.payload
            }
        case SET_PAGE_NUMBER: 
            return {
                ...state,
                pageNumber: action.payload
            }
        case SET_PAGE_SIZE: 
            return {
                ...state,
                pageSize: action.payload
            }
        case SET_TOTAL_COUNT: 
            return {
                ...state,
                totalCount: action.payload
            }
        case SET_ERROR: 
            return {
                ...state,
                error: action.payload
            }
        case SET_IS_FOLLOW: 
            return {
                ...state,
                items: state.items && state.items.map(i => {
                    if (i.id === action.payload.userId) {
                        return {...i, followed: action.payload.value}
                    } else {
                        return i
                    }
                })
            }
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.payload.type === 'start' ?
                    [...state.followingInProgress, action.payload.userId] :
                    state.followingInProgress?.filter(id => id !== action.payload.userId)
            }
        
        default:
            return state
    }
}

export default usersReducer