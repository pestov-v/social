import { createSelector } from 'reselect'

import { TStore } from '../store'
import { TAuthState } from '../authReducer'
import { userProfile } from './profileSelectors'

const auth = (state: TStore): TAuthState => state.auth
export const userIdSelector = createSelector(auth, a => a.userId)
export const loginSelector = createSelector(auth, a => a.login)
export const emailSelector = createSelector(auth, a => a.email)
export const isAuthSelector = createSelector(auth, a => a.isAuth)
export const captchaUrlSelector = createSelector(auth, a => a.captchaUrl)
export const isOwner = createSelector(auth, userProfile, (a, u) => a.userId === u.userId)