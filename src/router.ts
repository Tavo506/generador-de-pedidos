import {createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

import Home from "./pages/Home.vue";
import ListPage from "./pages/ListPage.vue";

const routes: RouteRecordRaw[] = [
    {path: '/', name: 'home', component: Home},
    {path: '/list', name: 'list', component: ListPage},
    {path: '/:pathMatch(.*)*', redirect: '/'},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
