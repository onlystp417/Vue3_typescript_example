import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "app" */ '@/App.vue'),
      children: [
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
        {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "liff" */ '@/liff/views/Home.vue')
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
        }
      ]
    }
  ]
});

export default router;
