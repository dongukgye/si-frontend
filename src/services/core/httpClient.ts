import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { IHttpClient, IHttpClientRequestParameters } from '@/services/core/interfase'

class HttpClient implements IHttpClient {

    get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken } = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            axios
                .get(url, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })

    }

    post<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken, payload } = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            axios
                .post(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })

    }
}

export default new HttpClient()