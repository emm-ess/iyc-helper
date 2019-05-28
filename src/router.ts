import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store/store'

Vue.use(Router)

function castIDtoNumber(route: any){
    const id = Number.parseInt(route.params.id, 10)
    if (Number.isNaN(id)) {
        // TODO:
        // go to 404
        return 0
    }
    return { id }
}


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/events',
            name: 'events',
            component: () => import(/* webpackChunkName: "permanent" */ '@/views/AllEvents.vue'),
        },
        {
            path: '/events/permanent',
            name: 'permanent',
            component: () => import(/* webpackChunkName: "permanent" */ '@/views/Permanent.vue'),
        },
        {
            path: '/event/:id',
            name: 'detail',
            component: () => import(/* webpackChunkName: "detail" */ '@/views/Detail.vue'),
            props: castIDtoNumber,
        },
        {
            path: '/day/:slug',
            name: 'day',
            component: () => import(/* webpackChunkName: "day" */ '@/views/Day.vue'),
            props: true,
        },
        {
            path: '/location/:slug',
            name: 'location',
            component: () => import(/* webpackChunkName: "location" */ '@/views/Location.vue'),
            props: true,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})

async function guard(to: any, from: any, next: any): Promise<void>{
    if (!store.state.initialized) {
        await store.dispatch('init')
    }
    next()
}

router.beforeEach(guard)

export default router
