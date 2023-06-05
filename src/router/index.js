import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import Features from '@/pages/FeaturesPage.vue'
import Calendar from '@/pages/CalendarPage.vue'
import Login from '@/pages/LoginPage.vue'
import Register from '@/pages/RegisterPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const publicPath = process.env.NODE_ENV === 'production' ? '/Frontend/' : '/';

const router = createRouter({
  history: createWebHistory(publicPath),
  routes
})

export default router
