import instance from './instance'
import {TUser} from '../types/users'
import {ResultCode} from '../types/resultCodes'

type TResponseGetUsers = {
    items: Array<TUser>
    totalCount: number
    error: Array<string>
}
const getUsers = async (pageSize: number, page: number): Promise<TResponseGetUsers | number> => {
    try {
        return (await instance.get(`users?count=${pageSize}&page=${page}`)).data
    } catch (e) {
        return ResultCode.Error
    }
}
const isFollow = async (userId: number): Promise<boolean | number> => {
    try {
        return (await instance.get(`follow/${userId}`)).data
    } catch (e) {
        return ResultCode.Error
    }
}
type TResponseFollow = {
    resultCode: number
    messages: Array<string>
}
const follow = async (userId: number): Promise<number | string> => {
    try {
        const response: TResponseFollow = (await instance.post(`follow/${userId}`)).data
        if (response.resultCode === ResultCode.Success) {
            return ResultCode.Success
        }
        return response.messages[0]
    } catch (e) {
        return ResultCode.Error
    }
}
const unfollow = async (userId: number): Promise<number | string> => {
    try {
        const response: TResponseFollow = (await instance.delete(`follow/${userId}`)).data
        if (response.resultCode === ResultCode.Success) {
            return ResultCode.Success
        }
        return response.messages[0]
    } catch (e) {
        return ResultCode.Error
    }
}

export default {
    getUsers,
    isFollow,
    follow,
    unfollow
}
