import { createApp } from 'vue'
import App from './TeacherApp.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/monokai.css'

import '@/index.css'


axios.defaults.baseURL = process.env.VUE_APP_ROOT_API


createApp(App)
    .use(store).use(router, axios).use(VueHighlightJS)
    .mount('#app')
