import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    // 前台部分
    {
      path: '/liff',
      name: 'liff',
      component: () => import('@/liff/views/IndexView.vue'),

      // children: [
      //   {
      //     path: 'navigation1',
      //     name: 'navigation2',
      //     component: () => import('@/'),
      //   },
      //   {
      //     path: 'navigation2',
      //     name: 'navigation2',
      //     component: () => import('@/'),
      //   },
      //   {
      //     path: 'navigation3',
      //     name: 'navigation3',
      //     component: () => import('@/'),
      //   },
      // ],
    },

    // 後台部分
    {
      path: '/backStage',
      name: 'backStage',
      component: () => import('@/backStage/views/IndexView.vue'),

      // children: [
      //   {
      //     path: 'navigation1',
      //     name: 'navigation2',
      //     component: () => import('@/'),
      //   },
      //   {
      //     path: 'navigation2',
      //     name: 'navigation2',
      //     component: () => import('@/'),
      //   },
      //   {
      //     path: 'navigation3',
      //     name: 'navigation3',
      //     component: () => import('@/'),
      //   },
      // ],
    },

    // 當網址是設定之外時，會直接導回home的view頁面。
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
