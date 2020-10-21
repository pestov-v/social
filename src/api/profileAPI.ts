import instance from './instance'
import { TProfile } from '../types/profile'
import { ResultCode } from '../types/resultCodes'



const getProfile = async (userId: number): Promise<TProfile | Error> => {
    try {
        return (await instance.get(`profile/${userId}`)).data        
    } catch (e) {
        return new Error(e.message)
    }
}

const getStatus = async (userId: number): Promise<string | Error> => {
    try {
        return (await instance.get(`profile/status/${userId}`)).data
    } catch (e) {
        return new Error(e.message)
    }
}
type TResposeStatus = {
    resultCode: number
    messages: Array<string>
    data: object
}
const setStatus = async (status: string): Promise<number | string | Error> => {
    try {
        const response: TResposeStatus = (await instance.put(`profile/status`, {status})).data
        if (response.resultCode === 0) {
            return ResultCode.Success
        }
        return response.messages[0]
    } catch (e) {
        return new Error(e.message)
    }
}
const setProfileInfo = async (data: TProfile): Promise<number | string | Error> => {
    try {
        const response = (await instance.put('profile', data)).data
        if (response.resultCode === ResultCode.Success) {
            return ResultCode.Success
        }
        return response.messages[0]
    } catch (e) {
        return new Error(e.message)
    }
}
const setPhoto = async (photo: File | null): Promise<string | number | Error> => {
    try {
        if (photo) {
            const formData = new FormData()
            formData.append('image', photo)
            const response = (await instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data
            if (response.resultCode === ResultCode.Success) {
                return ResultCode.Success
            }
            return response.messages[0]
        }
        return ResultCode.Error
    } catch (e) {
        return new Error(e.message)
    }
}
const getIsFollow = async (userId: number): Promise<boolean | Error> => {
    try {
        return (await instance.get(`follow/${userId}`)).data
    } catch (e) {
        return new Error(e.message)
    }
}


export default {
    getProfile,
    getStatus,
    setStatus,
    setProfileInfo,
    setPhoto,
    getIsFollow
}
