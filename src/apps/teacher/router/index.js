import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/Home.vue'
import Labs from '../views/Labs.vue'
import Exam from '../views/Exam.vue'
import Resources from '../views/Resources.vue'
import Profile from '../views/Profile.vue'


import Demo from '../views/demo/Demo.vue'
import AddResource from '../views/demo/AddResource.vue'

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
