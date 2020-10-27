import { useRoute } from 'vue-router'

export interface IUser {
    email: string
    password: string
}

export interface IHttpClientRequestParameters {
    url: string
    requiresToken: boolean
    payload?: T
}

export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters): Promise<T>
}