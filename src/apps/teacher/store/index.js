import { createStore } from 'vuex'

import auth from '@/apps/auth/store/auth.js'

export default createStore({
    state: {
        class_id: null,
    },
    getters: {
        class_id: state => state.class_id,
    },
    mutations: {
        SET_CLASS_ID(state, id){
            state.class_id = id
        },
    },
    modules: {
        auth: auth
    }
})
