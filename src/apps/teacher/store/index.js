import { createStore } from 'vuex'

import auth from '@/apps/auth/store/auth.js'

export default createStore({
    state: {
        classs: null,
    },
    getters: {
        classs: state => state.classs,
    },
    mutations: {
        SET_CLASSS(state, classs){
            state.classs = classs
        },
    },
    modules: {
        auth: auth
    }
})
