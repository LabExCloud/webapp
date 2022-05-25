import { createStore } from 'vuex'

import auth from '@/apps/auth/store/auth.js'

export default createStore({
    state: {
        class_id: null,
        is_lab: null,
    },
    getters: {
        class_id: state => state.class_id,
        is_lab: state => state.is_lab,
    },
    mutations: {
        SET_CLASS_ID(state, id){
            state.class_id = id
        },
        SET_IS_LAB(state, is_lab){
            state.is_lab = is_lab
        },
    },
    modules: {
        auth: auth
    }
})
