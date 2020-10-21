import instance from './instance'
// import {ResultCode, ResultCodeForCaptcha} from '../types/resultCodes'


type TResponseMe = { data: {email: string, login: string, id: number}, messages: Array<string>, resultCode: number}
const me = async ():Promise<TResponseMe> => {
    try {
        const response = await instance.get('auth/me')
        return response.data
    } catch (e) {
        throw new Error(e.message)
    }
}

type TResponseLogin = { data: {userId: number}, messages: Array<string>, resultCode: number }

const login = async (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null):Promise<TResponseLogin> => {
    try {
        return (await instance.post('auth/login', { email, password, rememberMe, captcha })).data
    } catch (e) {
        throw new Error(e.message)
    }
}

const logout = async () => {
    try {
        return (await instance.delete('auth/login')).data
    } catch (e) {

    }
}

const getCaptcha = async () => await instance.get<{url: string}>('security/get-captcha-url')

export default {
    me,
    login,
    logout,
    getCaptcha
}
