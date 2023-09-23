import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/index.vue';
import studentRoutes from './studentRoutes.js';
import coachRoutes from './coachRoutes.js';
import spiritualRoutes from './spiritualtRoutes.js';
import IndexStudentView from '../views/students/index.vue';
import IndexCoachView from '../views/coach&spirituality/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView,
      meta: { title: "Login" }
    },
    {
      path: '',
      name: 'Login',
      redirect: '/login'
    },
    {
      path: "/error",
      name: "Not Found",
      component: Error,
      meta: { title: 'Login' },
    },
    {
      path: '/students',
      name: 'Students',
      component: IndexStudentView,
      meta: { requiresAuth: true, roles: ['mahasiswa'] },
      children: studentRoutes
    },
    {
      path: "/coach",
      name: "Coach",
      component: IndexCoachView,
      meta: { requiresAuth: true, roles: ['pembina'] },
      children: coachRoutes
    },
    {
      path: "/spiritual",
      name: "Spiritual",
      component: IndexCoachView,
      meta: { requiresAuth: true, roles: ['divisi kerohanian'] },
      children: spiritualRoutes
    }
  ]
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));

  if (isAuthenticated == null || isAuthenticated == undefined) {
    if (to.path !== '/login') {
      return next('/login');
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated[4].auth) {
    next('/login');
  } else {
    const userRoles = ['pembina', 'divisi kerohanian', 'mahasiswa']
    if (to.meta.roles && !userRoles.some(role => to.meta.roles.includes(role))) {
      next('/error');
    } else {
      next();
    }
  }
});


export default router
