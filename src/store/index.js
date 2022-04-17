import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state: {
        token: '',
        user: '',
    },
    getters: {
        token: state => state.token,
        user: state => state.user,
        isAuthenticated: state => state.token !== '',
    },
    mutations: {
        INIT(){
            if(localStorage.getItem('token')){
                this.state.token = localStorage.getItem('token')
                this.state.user = JSON.parse(localStorage.getItem('user'))
            }else{
                this.state.user = {}
                this.state.token = ''
            }
        },
        SET_TOKEN(state, token){
            state.token = token
        },
        SET_USER(state, user){
            state.user = user
        },
    },
    actions: {
        async login({ commit }, cred){
            const response = await axios.post('/api/v1/token/login/', {
                username: cred.username,
                password: cred.password
            })
            if(response.data.auth_token){
                commit('SET_TOKEN', response.data.auth_token)
                localStorage.setItem('token', response.data.auth_token)
            }
            return response
        },
        logout({}){
            localStorage.setItem('token', '')
        },
        async getUser({ commit }){
            const response = await axios.get('/api/v1/profile')
            if(response.data){
                commit('SET_USER', JSON.parse(JSON.stringify(response.data)))
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response
        }
    },
    modules: {
    }
})
