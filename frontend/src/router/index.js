import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
  {
    path: '/cargo',
    name: 'Cargo',
    component: () => import('../views/cargo.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/contact.vue'),
    props: true,
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/products.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/product.vue'),
  },
  {
    path: '/user-basket',
    name: 'UserBasket',
    component: () => import ('../views/user-basket.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('../views/not-found-page.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
