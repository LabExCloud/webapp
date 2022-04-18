import { createRouter, createWebHistory } from 'vue-router'

import Labs from '../views/Labs.vue'
import Exam from '../views/Exam.vue'
import Resources from '../views/Resources.vue'
import Profile from '../views/Profile.vue'

import store from '@/store'


const routes = [
  {
    path: '/',
    redirect: '/labs'
  },
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL + 'student'),
  routes
})

router.beforeEach((to, from) => {
  if(!store.getters.isAuthenticated){
    location.href = '/login'
  }
  if(store.getters.user.is_staff){
    location.href = '/teacher'
  }
})

export default router