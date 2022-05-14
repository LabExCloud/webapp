import { createApp } from 'vue'
import App from './StudentApp.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import '@/index.css'


axios.defaults.baseURL = process.env.VUE_APP_ROOT_API


createApp(App)
    .use(store).use(router, axios)
    .mount('#app')
