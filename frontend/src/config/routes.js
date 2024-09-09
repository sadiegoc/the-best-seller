import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: () => import('@/components/views/Home.vue')
    }, {
        path: '/product/:pid',
        name: 'product',
        component: () => import('@/components/views/Product.vue')
    }, {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/components/views/Favorites.vue')
    }, {
        path: '/cart',
        name: 'cart',
        component: () => import('@/components/views/Cart.vue')
    }, {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/auth/Auth.vue')
    }, {
        path: '/about',
        name: 'about',
        component: () => import('@/components/views/About.vue')
    }, {
        path: '/contact',
        name: 'contact',
        component: () => import('@/components/views/Contact.vue')
    }, {
        path: '/category/:cid',
        name: 'category',
        component: () => import('@/components/views/Category.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router