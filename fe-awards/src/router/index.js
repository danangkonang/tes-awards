import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router';

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue'),
      },
    ],
  });
  router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('isLoged')) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });
  return router;
}
