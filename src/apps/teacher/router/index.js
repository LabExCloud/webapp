import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
// import Login from '@/views/Login.vue'

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

export default router
