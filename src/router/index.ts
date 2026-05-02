import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import PetDetail from '../views/PetDetail.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', redirect: '/store' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/store', name: 'Store', component: Store },
  { path: '/pet/:id', name: 'PetDetail', component: PetDetail, props: true },
  { path: '/about', name: 'About', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
