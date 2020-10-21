import {createSelector} from 'reselect'
import {TAppState} from '../appReducer'
import {TStore} from '../store'

export const app = (state: TStore): TAppState => state.app
export const initialization = createSelector(app, app => app.initialization)