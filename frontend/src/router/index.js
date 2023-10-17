import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

import {store} from '../store/index'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/products' }
    }
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
    component: () => import('../views/user-shopping-cart.vue')
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    beforeEnter: (to, from, next) => {
      if(!store.state.user) 
        return next()
      next({})
    },
    component: () => import('../views/sign-in.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    beforeEnter: (to, from, next) => {
      if(!store.state.user) 
        return next()
      next({})
    },
    component: () => import('../views/sign-up.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue'),/*
    beforeEnter: (to, from, next) => {/*
      if(store.state.user?.isAdmin) 
        return next()
      next({})
    },*/
    children: [
      {
        path: 'contact-list',
        component: () => import('../components/admin/contact-list.vue'),
      },
      {
        path: 'product-management',
        component: () => import('../components/admin/product-management.vue')
      },
      {
        path: 'order-management',
        component: () => import('../components/admin/order-management.vue')
      },
      {
        path: 'user-management',
        component: () => import('../components/admin/user-management.vue')
      }
    ]
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
