import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/views/MainPage.vue";
import ShowItem from "@/views/ShowItem.vue";

const routes = [
    { path: '/', component: MainPage, name: 'MainPage' },
    { path: `/:id`, component: ShowItem, props: true, name: 'ShowItem'}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
