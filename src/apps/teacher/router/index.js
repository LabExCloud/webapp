import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/Home.vue'
import Labs from '../views/labs/Labs.vue'
import Exam from '../views/exams/Exam.vue'
import Resources from '../views/resources/Resources.vue'
import Profile from '../views/Profile.vue'


import Demo from '../views/demo/Demo.vue'
import AddResource from '../views/demo/AddResource.vue'
import NotFound from '@/views/NotFound.vue'

import store from '@/store'


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
    path: '/profile',
    name: 'profile',
    component: Profile
  },

  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/demo/addresource',
    name: 'addresourcedemo',
    component: AddResource
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

router.beforeEach((to, from) => {
  if(!store.getters.isAuthenticated){
    location.href = '/login'
  }
  if(store.getters.user.user_type !== 'teacher'){
    location.href = '/login'
  }
})

export default router
