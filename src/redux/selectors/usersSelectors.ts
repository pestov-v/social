import {createSelector} from 'reselect'
import {TUsersState} from '../usersReducer'
import {TStore} from '../store'


export const users = (state :TStore): TUsersState => state.users
export const usersItems = createSelector(users, u => u.items)
export const loading = createSelector(users, u => u.loading)
export const pageNumberSelector = createSelector(users, u => u.pageNumber)
export const pageSizeSelector = createSelector(users, u => u.pageSize)
export const totalCountSelector = createSelector(users, u => u.totalCount)
export const errorSelectors = createSelector(users, u => u.error)
export const followingInProgress = createSelector(users, u => u.followingInProgress)