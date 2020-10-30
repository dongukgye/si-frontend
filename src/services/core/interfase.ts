import { Method } from 'axios'


/*
 * HTTP client interfaces
 */
export interface IHttpRequest<T> {
    path: string
    method: Method
    payload?: T
}

export interface IHttpResponse {
    count: number
    next: string | null
    previous: string | null
    results: any[]
}

export interface IHttpClient {
    request<T>(params: IHttpRequest<T>): Promise<T>
}


/*
 * Auth Interfaces
 */
export interface IUser {
    email: string
    password: string
}

export interface IUserInfo {
    name: string
    email: string
    avatar: string
}

export interface IUserInfoWithToken {
    token: string
    user: IUserInfo
}


/*
 * Inventory Interfaces
 */
export interface IItemUsage {
    name: string
}

export interface IItem {
    id: number
    category: number
    products: Array<IItemUsage>
    name: string
    desc: string
    serial: string
    quantity: number
    ideal_quantity: number
    order_quantity: number
    created_at: string
    updated_at: string
}