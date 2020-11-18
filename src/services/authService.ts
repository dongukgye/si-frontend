import httpClient from '@/services/core/httpClient'
import { IUser, IHttpRequest } from '@/services/core/interfase'


class AuthService {
    login(user: IUser): any {
        const params: IHttpRequest<any> = {
            path: '/auth/token-auth',
            method: 'post',
            data: user
        }
        return httpClient.request<any>(params)
    }

    logout() {
        localStorage.removeItem('accessToken')
    }
}

export default new AuthService()