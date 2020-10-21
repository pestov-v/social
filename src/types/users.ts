export type TUser = {
    id: number
    name: string | null
    uniqueUrlName: null | string,
    photos: {
        small: null | string,
        large: null | string
      },
    status: null | string,
    followed: boolean    
}