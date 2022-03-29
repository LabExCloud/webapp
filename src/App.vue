<template>
<div class="main">
    <router-view :user="user"/>
    
    <Navigation v-if="!(['login'].indexOf($route.name) > -1)" :user="user"/>
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
  data(){
    return {
      user: {
        name: 'Isabella Ava',
        class: 'S7 - 57',
        profilepic: 'https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg'
      }
    }
  },
  mounted(){
    if (this.$store.state.isAuthenticated){
      this.$router.push("/labs");
    }else{
      this.$router.push("/login");
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

<style lang="scss">
#app{
    height: 100%;
}
</style>
