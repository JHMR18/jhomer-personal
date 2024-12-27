import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import MemoriesView from '../views/MemoriesPage.vue'
import MessagePage from '@/views/MessagePage.vue'
import ResponsePage from '@/views/ResponsePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/memories',
      name: 'memories',
      component: MemoriesView,
    },
    {
      path: '/message',
      name: 'message',
      component: MessagePage
    },
    {
      path: '/response',
      name: 'response',
      component: ResponsePage
    }
  ],
})

export default router
