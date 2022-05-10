import axios from 'axios'

const auth = {
    namespaced: true,
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
        INIT(state){
            if(localStorage.getItem('token')){
                state.token = localStorage.getItem('token')
                state.user = JSON.parse(localStorage.getItem('user'))
            }else{
                state.user = {}
                state.token = ''
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
}

export default auth