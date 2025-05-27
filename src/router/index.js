import { createRouter, createWebHistory } from 'vue-router';
import Chat from '../view_controllers/ChatScreen.vue';
import Login from '../view_controllers/LoginScreen.vue';
import Privacy from '../view_controllers/Privacy.vue';
import Term from '../view_controllers/Terms.vue';

const routes = [
  { path: '/', component: Chat },
  { path: '/login', component: Login },
  { path: '/privacy', component: Privacy },
  { path: '/term', component: Term },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
