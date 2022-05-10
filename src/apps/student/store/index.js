import { createStore } from 'vuex'

import auth from '@/apps/auth/store/auth.js'

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    modules: {
        auth: auth
    }
})
