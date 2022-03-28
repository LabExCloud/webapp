<template>
<div class="main">
    <div class="section">

      <router-view :user="user"/>

    </div>

    <div class="menu-sidebar">
        <div class="profile">
            <img :src="user.profilepic" alt="student picture">
            <h3>{{ user.name }}</h3>
            <p>{{ user.class }}</p>
        </div>
        <ul>
            <li>
              <router-link to="/labs">
                <span class="icon"><font-awesome-icon :icon="['fas', 'desktop']"></font-awesome-icon></span>
                <span class="item">Lab</span>
              </router-link>
            </li>
            <li>
              <router-link to="/exam">
                <span class="icon"><font-awesome-icon :icon="['fas', 'keyboard']"></font-awesome-icon></span>
                <span class="item">Exam</span>
              </router-link>
            </li>
            <li>
              <router-link to="/resources">
                <span class="icon"><font-awesome-icon :icon="['fas', 'book']"></font-awesome-icon></span>
                <span class="item">Resources</span>
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                <span class="icon"><font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon></span>
                <span class="item">Profile Settings</span>
              </router-link>
            </li>
            <li>
                <a href="/login.html">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'sign-out-alt']"></font-awesome-icon></span>
                    <span class="item">Logout</span>
                </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
// import Exam from './views/Exam.vue'
// import Labs from './views/Labs.vue'
// import Profile from './views/Profile.vue'
// import Resources from './views/Resources.vue'

// const routes = {
//   '/': Labs,
//   '/labs': Labs,
//   '/exam': Exam,
//   '/resources': Resources,
//   '/profile': Profile
// }

export default {
  name: 'App',
  data(){
    return {
      // currentPath: window.location.hash,
      // activeElement:1,
      user: {
        name: 'Isabella Ava',
        class: 'S7 - 57',
        profilepic: 'https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg'
      }
    }
  },
  // methods:{
  //   activate(el){
  //     this.activeElement = el
  //   }
  // },
  // computed: {
  //   currentView() {
  //     return routes[this.currentPath.slice(1) || '/']
  //   }
  // },
  // mounted() {
  //   window.addEventListener('hashchange', () => {
	// 	  this.currentPath = window.location.hash
	// })
  // }
}
</script>

<style lang="scss">
#app{
    height: 100%;
}
</style>
