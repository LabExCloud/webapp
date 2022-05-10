import { createApp } from 'vue'
import App from './TeacherApp.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import '@/index.css'


axios.defaults.baseURL = 'http://localhost:8000'


createApp(App)
    .use(store).use(router, axios)
    .mount('#app')
