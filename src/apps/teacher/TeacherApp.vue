<template>
<div class="h-screen mainpage flex justify-center items-center font-snig text-base">
    <Navigation v-if="$route.name !== 'home'"/>
    
    <router-view/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Navigation from './components/Navigation.vue'

export default {
    name: 'TeacherApp',
    components: {
        Navigation
    },
    computed: {
        ...mapGetters('auth', [
            'isAuthenticated',
            'token',
            'user'
        ])
    },
    created() {
        this.$store.commit('auth/INIT')
        axios.defaults.headers.common['Authorization'] = 'Token ' + this.token
    },
}
</script>
