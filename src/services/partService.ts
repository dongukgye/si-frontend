import httpClient from '@/services/core/httpClient'
import { IHttpRequest, IHttpResponse } from '@/services/core/interfase'

// - TODO: add params for getParts() API

class PartService {
    getParts(params: any) {
        const axiosConfig: IHttpRequest<any> = {
            path: '/inventory/parts/',
            method: 'get',
            params: params
        }
        return httpClient.request(axiosConfig)
    }

    createPart(data: any): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: 'inventory/parts/',
            method: 'post',
            data: data
        }
        return httpClient.request<IHttpResponse>(params)
    }

    updatePart(data: any): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: `inventory/part/${data.id}/`,
            method: 'put',
            data: data
        }
        return httpClient.request<IHttpResponse>(params)
    }

    deletePart(data: any): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: `inventory/part/${data.id}/`,
            method: 'delete',
            data: data
        }
        return httpClient.request<IHttpResponse>(params)
    }
}

export default new PartService()