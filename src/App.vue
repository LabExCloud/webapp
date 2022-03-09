<template>
<div class="main">
  <!-- div l;ayout
  div ;left -- navbar
  div top div 
  div content

  use vue-router

  fix the css div 

  -->
    <div class="section">
        <div class="top_navbar">
        </div>

        <!-- <Exam/> -->
        <!-- <Resources/> -->
        <!-- <Profile/> -->
        <Labs/>
    </div>

    <div class="menu-sidebar">
        <div class="profile">
            <img :src="user.profilepic" alt="student picture">
            <h3>{{ user.name }}</h3>
            <p>{{ user.subtitle }}</p>
        </div>
        <ul>
            <li>
                <a href="../lab/index.html" class="active">
                    <span class="icon"><i class="fas fa-desktop"></i></span>
                    <span class="item">Lab</span>
                </a>
            </li>
            <li>
                <a href="../exam/index.html">
                    <span class="icon"><i class="far fa-keyboard"></i></span>
                    <span class="item">Exam</span>
                </a>
            </li>
            <li>
                <a href="../resources/index.html">
                    <span class="icon"><i class="fas fa-book"></i></span>
                    <span class="item">Resources</span>
                </a>
            </li>
            <li>
                <a href="../profile/settings.html">
                    <span class="icon"><i class="fas fa-cog"></i></span>
                    <span class="item">Profile Settings</span>
                </a>
            </li>
            <li>
                <a href="../../index.html">
                    <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
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
      user: {
        name: 'Issebella ava',
        subtitle: 'S7 - 57',
        profilepic: 'https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg'
      }
    }
  }
}
</script>

