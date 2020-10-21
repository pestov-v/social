import instance from './instance'
import { TDialogs, TMessage, TMessages } from '../types/dialogs'
import formatText from '../utils/formatText'

const getAllDialogs = async () => {
    try {
        const response:TDialogs = (await instance.get(`dialogs`)).data
        return response
    } catch (e) {
        console.log(e.message)
    }
}

type TSendMessageResponse = {
    data: {message: TMessage}
    messages: Array<string>
    resultCode: number
}
const sendMessage = async (userId: number, text: string) => {
    try {
        const response:TSendMessageResponse = (await instance.post(`dialogs/${userId}/messages`,
                                                {body: formatText.shielding(text)})).data
        return response
    } catch (e) {
        console.log(e.message)
    }
}
type TGetMessagesResponse = {
    error: null | string[]
    items: TMessages
    totalCount: number
}
const getMessages = async (userId: number, page = 1, count = 10) => {
    try {
        const response: TGetMessagesResponse = (await instance.get(`dialogs/${userId}/messages/?page=${page}&count=${count}`)).data
        return response
    } catch (e) {
        throw new Error(e.messages)
    }
}
export default {
    getAllDialogs,
    getMessages,
    sendMessage
}