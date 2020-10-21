import {
    TDialogsActions,
    SET_PROFILE,
    SET_DIALOGS,
    SET_ACTIVE_DIALOG,
    ADD_MESSAGES,
    SET_MESSAGES,
    SET_NEW_MESSAGES,
    RESET_NEW_MESSAGES,
    LOADING_DIALOGS,
    LOADING_MESSAGES,
    SET_MESSAGES_COUNT,
    SET_PAGE_NUMBER
} from './dialogsActions'
import { TDialogs } from '../types/dialogs'

const initialState = {
    data: [] as TDialogs,
    page: 1,
    pageSize: 10,
    newMessages: 0,
    selectedDialog: null as null | number,
    loadingDialogs: false,
    loadingMessages: false
}

export type TDialogsState = typeof initialState

const dialogsReducer = (state = initialState, action: TDialogsActions): TDialogsState => {
    switch (action.type) {
        case SET_DIALOGS:
            return { ...state, data: action.payload }
        case SET_PROFILE:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, profile: action.payload.profile }
                    }
                    return item
                })
            }
        case SET_ACTIVE_DIALOG:
            return { ...state, selectedDialog: action.payload }
        case SET_MESSAGES:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.userId) {
                        return {...item, messages: action.payload.messages}
                    }
                    return item
                })
            }
        case SET_NEW_MESSAGES: 
            return { ...state, newMessages: action.payload }
        case ADD_MESSAGES:
            return { 
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.userId) {
                        return {
                            ...item,
                            messages: action.payload.messages instanceof Array ?
                                    [...action.payload.messages, ...item.messages] :
                                    [...item.messages, action.payload.messages]
                        }
                    }
                    return item
                })
             }
        case RESET_NEW_MESSAGES: 
            let readMessagesCount = 0
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload) {
                        readMessagesCount = item.newMessagesCount
                        return { ...item, newMessagesCount: 0, hasNewMessages: false }
                    }
                    return item
                }),
                newMessages: state.newMessages - readMessagesCount
            }
        case SET_MESSAGES_COUNT: 
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, totalCount: action.payload.value }
                    }
                    return item
                })
            }
        case LOADING_DIALOGS:
            return { ...state, loadingDialogs: action.payload }
        case LOADING_MESSAGES:
            return { ...state, loadingMessages: action.payload }
        case SET_PAGE_NUMBER:
            return { ...state, page: action.payload }
        default:
            return state
    }
}

export default dialogsReducer
