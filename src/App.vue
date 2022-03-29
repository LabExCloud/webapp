<template>
<div class="main">
    <router-view :user="user"/>
    
    <Navigation v-if="!(['login'].indexOf($route.name) > -1)" :user="user"/>
</div>
</template>

<script>
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
    this.$router.push("/login");
  }
}
</script>

<style lang="scss">
#app{
    height: 100%;
}
</style>
