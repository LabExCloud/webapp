<template>
<div class="h-screen mainpage flex justify-center items-center font-snig text-base">
    <Navigation v-if="!(['login'].indexOf($route.name) > -1)"/>
    
    <router-view/>
</div>
</template>

<script>
import axios from 'axios'
import Navigation from '@/components/Navigation.vue'

export default {
    name: 'App',
    components: {
        Navigation
    },
    mounted(){
        if (!this.$store.state.isAuthenticated){
            window.location.href = '/'
            // this.$router.push("/login");
        }
        
    },
    beforeCreate() {
        this.$store.commit('initializeStore')
        
        const token = this.$store.state.token
        
        if (token) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token
        } else {
        axios.defaults.headers.common['Authorization'] = ''
        }
    }
}
</script>
