<template>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default({
    name: 'Logout',
    mounted(){
        document.title = 'Login'

        this.$store.dispatch('auth/logout')
        this.$store.commit('auth/INIT')
        
        this.$router.push('/login')
    },
})
</script>
