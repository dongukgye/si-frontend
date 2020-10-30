import httpClient from '@/services/core/httpClient'
import { IHttpRequest, IHttpResponse } from '@/services/core/interfase'

// - TODO: add params for getParts() API

class PartService {
    getParts(): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: '/inventory/parts/',
            method: 'get'
        }
        return httpClient.request<IHttpResponse>(params)
    }

    createPart(data: any): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: 'inventory/parts/',
            method: 'post',
            payload: data
        }
        return httpClient.request<IHttpResponse>(params)
    }

    updatePart(data: any): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: `inventory/part/${data.id}/`,
            method: 'put',
            payload: data
        }
        return httpClient.request<IHttpResponse>(params)
    }

    deletePart(data: any): Promise<IHttpResponse> {
        const params: IHttpRequest<any> = {
            path: `inventory/part/${data.id}/`,
            method: 'delete',
            payload: data
        }
        return httpClient.request<IHttpResponse>(params)
    }
}

export default new PartService()