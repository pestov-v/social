import {Nullable} from './app'

export type TContacts = {
    github: Nullable<string>
    vk: Nullable<string>
    facebook: Nullable<string>
    instagram: Nullable<string>
    twitter: Nullable<string>
    website: Nullable<string>
    youtube: Nullable<string>
    mainLink: Nullable<string>
}
export type TPhotos = {
    small: Nullable<string>
    large: Nullable<string>
}
export type TProfile = {
    userId: Nullable<number>
    aboutMe: Nullable<string>
    lookingForAJob: Nullable<boolean>
    lookingForAJobDescription: Nullable<string>
    fullName: Nullable<string>
    contacts: TContacts
    photos: TPhotos
}

export type TPost = {
    id: string
    text: string
    likes: number
}
export type TPosts = Array<TPost>
export enum ProfileType {
    Owner = 0,
    Other = 1
}
export type TProfileType = ProfileType.Owner | ProfileType.Other