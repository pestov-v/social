export type Nullable<T> = null | T
type PropsType<T> = T extends {[key: string]: infer U} ? U : never
export type ActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropsType<T>>
