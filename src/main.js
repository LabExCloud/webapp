import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faKeyboard, faBook, faCog, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faDesktop, faKeyboard, faBook, faCog, faSignOutAlt, faSearch);

axios.defaults.baseURL = 'http://localhost:8000'


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(store).use(router, axios)
    .mount('#app')
