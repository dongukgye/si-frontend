import httpClient from '@/services/core/httpClient'
import { IUser, IHttpClientRequestParameters } from '@/services/core/interfase'


class AuthService {
    login(user: IUser): any {
        const params: IHttpClientRequestParameters = {
            url: 'http://localhost:8000/api/v1/auth/token-auth',
            requiresToken: false,
            payload: {
                email: user.email,
                password: user.password
            }
        }
        return httpClient.post<any>(params)
    }

    logout() {
        localStorage.removeItem('accessToken')
    }
}

export default new AuthService()