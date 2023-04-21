import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import Features from '@/pages/FeaturesPage.vue'
import Calendar from '@/pages/CalendarPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
