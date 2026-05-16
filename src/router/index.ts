import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import PetDetail from '../views/PetDetail.vue'
import About from '../views/About.vue'
import Food from '../views/Food.vue'
import CartView from '../views/CartView.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Checkout from '../views/Checkout.vue'
import ThankYou from '../views/ThankYou.vue'

const routes = [
  { path: '/', redirect: '/store' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/store', name: 'Store', component: Store },
  { path: '/pet/:id', name: 'PetDetail', component: PetDetail, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/food', name: 'Food', component: Food },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/order-confirmation', name: 'ThankYou', component: ThankYou },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
