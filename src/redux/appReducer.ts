import {TAppActions, SET_INITILIZATION} from './appActions'

const initialState = {
    initialization: true
}

export type TAppState = typeof initialState

const appReducer = (state = initialState, action: TAppActions): TAppState => {
    switch (action.type) {
        case SET_INITILIZATION:
            return {
                ...state,
                initialization: action.payload.value
            }
        default:
            return state
    }
}

export default appReducer
