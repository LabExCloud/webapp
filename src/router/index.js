import { createRouter, createWebHistory } from 'vue-router'
import Labs from '@/views/Labs.vue'
import Exam from '@/views/Exam.vue'
import Resources from '@/views/Resources.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/labs',
    name: 'labs',
    component: Labs
  },
  {
    path: '/exam',
    name: 'exam',
    component: Exam
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router