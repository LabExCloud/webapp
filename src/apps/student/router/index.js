import { createRouter, createWebHistory } from 'vue-router'

import Labs from '../views/Labs.vue'

import Exam from '../views/Exam.vue'

import Resources from '../views/resources/Resources.vue'
import ResourceDetail from '../views/resources/ResourceDetail.vue'

import Profile from '../views/Profile.vue'

import EditorDemo from '../views/EditorDemo.vue'

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
    path: '/resources/:sem?',
    name: 'resources',
    component: Resources
  },
  {
    path: '/resources/res/:res',
    name: 'resource',
    component: ResourceDetail
  },
  
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/editor',
    name: 'editor',
    component: EditorDemo
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
