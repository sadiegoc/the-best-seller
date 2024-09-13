import { createRouter, createWebHistory } from "vue-router";
import { userStorage } from "./global";
import store from "./store";

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
        component: () => import('@/components/pages/favorites/Favorites.vue'),
        meta: { requiresAuth: true }
    }, {
        path: '/cart',
        name: 'cart',
        component: () => import('@/components/pages/cart/Cart.vue')
    }, {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/auth/Auth.vue'),
        meta: { requiresAuth: false }
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
        path: '/collection/:cid',
        name: 'collection',
        component: () => import('@/components/pages/collection/Collection.vue')
    }, {
        path: '/user',
        name: 'user',
        component: () => import('@/components/pages/user/User.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userStorage)
    store.state.showSideMenu = false

    if (to.matched.some(record => record.meta.requiresAuth === true)) {
        const user = JSON.parse(json)
        user ? next() : next({ name: 'auth' })
    } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
        const user = JSON.parse(json)
        user ? next({ name: 'home' }) : next()
    } else {
        next()
    }

})

export default router