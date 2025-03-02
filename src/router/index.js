import { createRouter, createWebHistory } from 'vue-router';
import Chat from '../view_controllers/ChatScreen.vue';
import Login from '../view_controllers/LoginScreen.vue';

const routes = [
  { path: '/', component: Chat },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
