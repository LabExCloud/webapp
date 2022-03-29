import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faKeyboard, faBook, faCog, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faDesktop, faKeyboard, faBook, faCog, faSignOutAlt, faSearch);


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .mount('#app')
