import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    // 後台部分
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'Appointment' },
      component: () => import(/* webpackChunkName: "admin" */ '@/backStage/views/Home.vue'),
      children: [
        {
          path: '/appointment',
          name: 'Appointment',
          redirect: { name: 'AppointmentView' },
          component: () =>
            import(/* webpackChunkName: "admin" */ '@/backStage/views/Appointment.vue'),
          children: [
            {
              path: '/appointmentView',
              name: 'AppointmentView',
              component: () =>
                import(/* webpackChunkName: "admin" */ '@/backStage/views/AppointmentView.vue')
            }
          ]
        }
      ]
    },
    // 前台部分
    {
      path: '/liff',
      name: 'liff',
      component: () => import(/* webpackChunkName: "liff" */ '@/liff/views/Home.vue')
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
      redirect: { name: 'Home' }
    }
  ]
});

export default router;
