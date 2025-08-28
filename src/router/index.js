import { createRouter, createWebHistory } from "vue-router";
import HomeWrapper from "../view_controllers/HomeScreenWrapper.vue";
import Home from "../view_controllers/HomeScreen.vue"
import About from "../view_controllers/AboutScreen.vue";
import Product from "../view_controllers/ProductScreen.vue";
import Pricing from "../view_controllers/PricingScreen.vue";
import Thank from "../view_controllers/ThankScreen.vue";
import Login from "../view_controllers/LoginScreen.vue";
import Privacy from "../view_controllers/Privacy.vue";
import Term from "../view_controllers/Terms.vue";
import ChumChat from "../view_controllers/ChumChatScreen.vue";
import NotFound from "../view_controllers/NotFoundScreen.vue"
import Registration from "../view_controllers/RegistrationScreen.vue";
import ChatScreen from "../view_controllers/ChatScreen.vue"; // Import ChatScreen

function isAuthenticated() {
  return localStorage.getItem('session_token') !== null;
}

const routes = [
  { 
    path: "/", 
    component: HomeWrapper,
    meta: { requiresAuth: false, redirectIfAuthenticated: '/chat' } // Redirect to /chum if authenticated
  },
  { path: "/login", component: Login, meta: { redirectIfAuthenticated: '/chat' } },
  { path: "/register", component: Registration, meta: { redirectIfAuthenticated: '/chat' } },
  { path: "/privacy", component: Privacy },
  { path: "/term", component: Term },
  { path: "/notfound", component: NotFound },
  { path: "/home", component: Home },
  { path: "/about", component: About },
  { path: "/product", component: Product },
  { path: "/pricing", component: Pricing },
  { path: "/thank", component: Thank },
  { path: "/chum", component: ChumChat, meta: { requiresAuth: true } }, // Chat screen requires authentication
  { path: "/chat", component: ChatScreen, meta: { requiresAuth: true } }, // Chat screen requires authentication
  { path: "/:pathMatch(.*)*", redirect: "/notfound" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();

  if (to.meta.redirectIfAuthenticated && authenticated) {
    next(to.meta.redirectIfAuthenticated);
  } else if (to.meta.requiresAuth && !authenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
