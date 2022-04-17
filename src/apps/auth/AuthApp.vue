<template>
<div class="h-screen mainpage flex justify-center items-center font-snig text-base">
    <router-view/>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'App',
    mounted(){
        if (!this.$store.state.isAuthenticated){
            this.$router.push("/login");
        }else{
            window.location.href = '/student/'
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
