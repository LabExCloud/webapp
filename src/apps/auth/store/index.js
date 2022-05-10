import { createStore } from 'vuex'

import auth from './auth.js'

export default createStore({
    modules: {
        auth: auth
    }
})
