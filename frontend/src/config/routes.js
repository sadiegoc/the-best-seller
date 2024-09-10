import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: () => import('@/components/pages/home/Home.vue')
    }, {
        path: '/product/:pid',
        name: 'product',
        component: () => import('@/components/pages/product/Product.vue')
    }, {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/components/pages/favorites/Favorites.vue')
    }, {
        path: '/cart',
        name: 'cart',
        component: () => import('@/components/pages/cart/Cart.vue')
    }, {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/auth/Auth.vue')
    }, {
        path: '/about',
        name: 'about',
        component: () => import('@/components/pages/about/About.vue')
    }, {
        path: '/contact',
        name: 'contact',
        component: () => import('@/components/pages/contact/Contact.vue')
    }, {
        path: '/category/:cid',
        name: 'category',
        component: () => import('@/components/pages/category/Category.vue')
    }, {
        path: '/collection',
        name: 'collection',
        component: () => import('@/components/pages/collection/Collection.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router