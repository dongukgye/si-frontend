import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { IHttpClient, IHttpRequest } from '@/services/core/interfase'
import { resolveComponent } from 'vue'

class HttpClient implements IHttpClient {

    baseURL = process.env.VUE_APP_API_BASE_URL

    request<T>(params: IHttpRequest<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { path, method, payload } = params
            const axiosConfig: AxiosRequestConfig = {
                url: this.baseURL + path,
                method: method,
                data: payload
            }

            axios.request(axiosConfig)
                .then((response: AxiosResponse) => {
                    resolve(response.data as T)
                })
                .catch((response: AxiosError) => {
                    reject(response)
                })
        })
    }
}

export default new HttpClient()