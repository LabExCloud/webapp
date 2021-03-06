import { createRouter, createWebHistory } from 'vue-router'

import Labs from '../views/labs/Labs.vue'
import LabExps from '../views/labs/LabExps.vue'

import Exams from '../views/exams/Exams.vue'
import ExamClass from '../views/exams/ExamClass.vue'
import Exam from '../views/exams/Exam.vue'

import Resources from '../views/resources/Resources.vue'
import ResourceDetail from '../views/resources/ResourceDetail.vue'

import Profile from '../views/Profile.vue'

import IDE from '../views/IDE.vue'
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
    component: IDE
  },
  {
    path: '/exams',
    name: 'exams',
    component: Exams
  },
  {
    path: '/exams/class/:cid',
    name: 'examlist',
    component: ExamClass
  },
  {
    path: '/exams/exam/:eid',
    name: 'exam',
    component: Exam
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
  {
    path: '/ide',
    name: 'ide',
    component: IDE
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

router.beforeEach((to, from, next) => {
  if(!store.getters['auth/isAuthenticated']){
    location.href = '/login'
  }else{
    if(store.getters['auth/user'].user_type !== 'student'){
      location.href = '/login'
    }else{
      next()
    }
  }
})

export default router
