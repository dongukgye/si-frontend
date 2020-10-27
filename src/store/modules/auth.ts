import Axios from 'axios'
import AuthService from "@/services/authService"
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IUser, IUserInfoWithToken } from "@/services/interfase"

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
    token: string = localStorage.getItem('accessToken') || ''
    userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    loggedIn = this.token ? true : false

    @Mutation
    loginSuccess(data: IUserInfoWithToken) {
        this.token = data.token
        this.userInfo = data.user
        this.loggedIn = true

        localStorage.setItem('accessToken', this.token)
        localStorage.setItem('userInfo', JSON.stringify(data.user))
    }

    @Mutation
    loginFailure() {
        this.loggedIn = false
        this.token = ''
    }

    @Mutation
    logoutSuccess() {
        this.loggedIn = false
        this.token = ''
    }

    @Mutation
    registerSuccess() {
        this.loggedIn = false
    }

    @Mutation
    registerFailure() {
        this.loggedIn = false
    }

    @Action
    login(user: IUser) {
        return AuthService.login(user).then(
            (data: IUserInfoWithToken) => {
                this.context.commit('loginSuccess', data)
                Axios.defaults.headers.common['Authorization'] = 'JWT ' + data.token
                return Promise.resolve(data.token)
            },
            (error: any) => {
                this.context.commit('loginFailure')
                return Promise.reject(error)
            }
        )
    }

    @Action
    logout() {
        AuthService.logout()
        delete Axios.defaults.headers.common['Authorization']
        this.context.commit('logoutSuccess')
    }
}
