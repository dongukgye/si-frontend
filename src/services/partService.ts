import httpClient from '@/services/core/httpClient'
import httpCilent from "@/services/core/httpClient"
import { IUser, IHttpClientRequestParameters } from '@/services/core/interfase'


class PartService {
    getParts(): any {
        const params: IHttpClientRequestParameters = {
            url: 'http://localhost:8000/api/v1/inventory/parts/',
            requiresToken: true
        }
        return httpClient.get<any>(params)
    }
}

export default new PartService()