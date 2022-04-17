import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'

import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL + 'teacher'),
  routes
})

router.beforeEach((to, from) => {
  if(!store.getters.isAuthenticated){
    location.href = '/login'
  }
  if(!store.getters.user.is_staff){
    location.href = '/student'
  }
})

export default router
