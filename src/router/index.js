import { createRouter, createWebHistory } from "vue-router";
import Chat from "../view_controllers/ChatScreen.vue";
import Login from "../view_controllers/LoginScreen.vue";
import Privacy from "../view_controllers/Privacy.vue";
import Term from "../view_controllers/Terms.vue";
import ChumChat from "../view_controllers/ChumChatScreen.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: "/", component: Chat, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/privacy", component: Privacy },
  { path: "/term", component: Term },
  { path: "/chum", component: ChumChat, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isFirebaseInitialized = false;

onAuthStateChanged(auth, (user) => {
  isFirebaseInitialized = true;
  if (user && router.currentRoute.value.path === "/login") {
    router.push("/");
  }
  if (!user && router.currentRoute.value.meta.requiresAuth) {
    router.push("/login");
  }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (!isFirebaseInitialized) {
    onAuthStateChanged(auth, () => {
      const isAuthenticatedAfterInit = auth.currentUser;
      if (requiresAuth && !isAuthenticatedAfterInit) {
        next("/login");
      } else if (to.path === "/login" && isAuthenticatedAfterInit) {
        next("/");
      } else {
        next();
      }
    });
  } else {
    if (requiresAuth && !isAuthenticated) {
      next("/login");
    } else if (to.path === "/login" && isAuthenticated) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
