import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/Home.vue'
import Labs from '../views/labs/Labs.vue'
import Exam from '../views/exams/Exam.vue'
import Resources from '../views/resources/Resources.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import Analysis from '../views/Analysis.vue'



import Answers from '../views/Answers.vue'

import NotFound from '@/views/NotFound.vue'

import store from '../store'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: Analysis
  },
  {
    path: '/answers/:ansid',
    name: 'answers',
    component: Answers
  },

  //not found pages
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL + 'teacher'),
  routes
})

router.beforeEach((to, from, next) => {
  if(store.getters['auth/isAuthenticated']){
    if(store.getters['auth/user'].user_type === 'teacher'){
      if(!store.getters['classs'] && to.name !== 'home' && to.name !== 'profile'){
        next({ name: 'home' })
        return
      }else{
        next()
      }
    }else{
      location.href = '/login'
    }
  }else{
    location.href = '/login'
  }
})

export default router
