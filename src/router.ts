import {createWebHistory, createRouter} from 'vue-router'

import Home from "./components/Home.vue";
import ListPage from "./components/ListPage.vue";

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/list', name: 'list', component: ListPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
