import {
    SET_PROFILE,
    SET_STATUS,
    ADD_POST,
    CHANGE_POST,
    TProfileActions,
    DELETE_POST,
    SET_PHOTO,
    LOADING_DATA,
    SET_IS_FOLLOW
} from './profileActions'
import {TProfile, TPosts, ProfileType} from '../types/profile'

export const defaultProfile = {
    userId: null,
    aboutMe: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    fullName: null,
    contacts: {
        facebook: null,
        vk: null,
        github: null,
        youtube: null,
        instagram: null,
        mainLink: null,
        twitter: null,
        website: null
    },
    photos: {
        small: null,
        large: null
    }
} as TProfile

const initialState = {
    loading: false,
    userProfile: defaultProfile,
    ownerProfile: defaultProfile,
    status: null as null | string,
    posts: [
        {id: '1', text: 'Life is beautiful', likes: 3},
        {id: '2', text: 'Today we start a new life...', likes: 7},
        {id: '3', text: 'This will be a great moment', likes: 0},
    ] as TPosts,
    isFollow: false
}

export type TProfileState = typeof initialState

const profileReducer = (state = initialState, action: TProfileActions): TProfileState => {
    switch (action.type) {
        case SET_PROFILE:
            if (action.payload.typeProfile === ProfileType.Owner) {
                return { ...state, ownerProfile: action.payload.profile }
            } else {
                return { ...state, userProfile: action.payload.profile }
            }
            
        case SET_STATUS: 
            return {
                ...state,
                status: action.payload
            }
        case SET_PHOTO: 
            return { ...state }
        case ADD_POST:
            const newPost = { id: Number(new Date()).toString(), text: action.payload, likes: 0 }
            return {...state, posts: [newPost, ...state.posts]}
        case CHANGE_POST:
            return {
                ...state,
                posts: state.posts.map(item => {
                        if (item.id === action.payload.id) {
                            return {...item, text: action.payload.text}
                        }
                        return item
                    })
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.payload)
            }
        case SET_IS_FOLLOW:
            return { ...state, isFollow: action.payload }
        case LOADING_DATA: 
            return {
                ...state,
                loading: action.payload
            }
        
        default:
            return state
    }
}

export default profileReducer
