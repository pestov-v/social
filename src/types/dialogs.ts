import { TProfile } from './profile'

export type TMessage = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null | string
    viewed: boolean
}

export type TMessages = Array<TMessage>
export type TDialog = {
    hasNewMessages: boolean
    id: number
    profile: TProfile
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {small: null | string, large: null | string}
    userName: string
    messages: TMessages
    totalCount: number
}
export type TDialogs = Array<TDialog>