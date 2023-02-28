import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView.vue'
import InsertView from '../views/InsertView.vue'
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'InsertView',
    component: InsertView,
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
