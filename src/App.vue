<template>
<div class="main">
  <!-- div layout
  div content
  use vue-router 
  -->
    <div class="section">

        <!-- <Exam/> -->
        <!-- <Resources/> -->
        <!-- <Profile/> -->
        <!-- <Labs/> -->

        <component :is="currentView" />

    </div>

    <div class="menu-sidebar">
        <div class="profile">
            <img :src="user.profilepic" alt="student picture">
            <h3>{{ user.name }}</h3>
            <p>{{ user.class }}</p>
        </div>
        <ul>
            <li>
                <a href="#/labs" @click="activate(1)" :class="{ active : activeElement == 1 }">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'desktop']"></font-awesome-icon></span>
                    <span class="item">Lab</span>
                </a>
            </li>
            <li>
                <a href="#/exam" @click="activate(2)" :class="{ active : activeElement == 2 }">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'keyboard']"></font-awesome-icon></span>
                    <span class="item">Exam</span>
                </a>
            </li>
            <li>
                <a href="#/resources" @click="activate(3)" :class="{ active : activeElement == 3 }">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'book']"></font-awesome-icon></span>
                    <span class="item">Resources</span>
                </a>
            </li>
            <li>
                <a href="#/profile" @click="activate(4)" :class="{ active : activeElement == 4 }">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon></span>
                    <span class="item">Profile Settings</span>
                </a>
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
import Exam from './components/Exam.vue'
import Labs from './components/Labs.vue'
import Profile from './components/Profile.vue'
import Resources from './components/Resources.vue'

const routes = {
  '/': Labs,
  '/labs': Labs,
  '/exam': Exam,
  '/resources': Resources,
  '/profile': Profile
}

export default {
  name: 'App',
  components: {
    Exam,
    Labs,
    Profile,
    Resources
  },
  data(){
    return {
      currentPath: window.location.hash,
      activeElement:1,
      user: {
        name: 'Isabella Ava',
        class: 'S7 - 57',
        profilepic: 'https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg'
      }
    }
  },
  methods:{
    activate(el){
      this.activeElement = el
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
        //   console.log("path changed")
	})
  }
}
</script>

<style>
    #app{
        height: 100%;
    }
</style>
