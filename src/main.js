import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import Plugin from '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.js';
import '@quasar/quasar-ui-qcalendar/src/css/calendar-month.sass';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Plugin);
app.mount('#app');
