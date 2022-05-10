import { createRouter, createWebHistory } from 'vue-router'

import Labs from '../views/labs/Labs.vue'
import LabExps from '../views/labs/LabExps.vue'

import Exams from '../views/exams/Exams.vue'
import ExamInfo from '../views/exams/ExamInfo.vue'

import Resources from '../views/resources/Resources.vue'
import ResourceDetail from '../views/resources/ResourceDetail.vue'

import Profile from '../views/Profile.vue'


import EditorDemo from '../views/EditorDemo.vue'
import NotFound from '@/views/NotFound.vue'

import store from '../store'


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
    path: '/labs/lab/:labid',
    name: 'lab',
    component: LabExps
  },
  {
    path: '/labs/exp/:expid',
    name: 'exp',
    component: EditorDemo
  },
  {
    path: '/exams',
    name: 'exams',
    component: Exams
  },
  {
    path: '/exams/exam/info/:examid',
    name: 'exam',
    component: ExamInfo
  },

  {
    path: '/resources',
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
  },

  //not found pages
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL + 'student'),
  routes
})

router.beforeEach((to, from) => {
  if(!store.getters['auth/isAuthenticated']){
    location.href = '/login'
  }
  if(store.getters['auth/user'].user_type !== 'student'){
    location.href = '/login'
  }
})

export default router
