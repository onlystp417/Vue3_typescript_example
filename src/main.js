import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import * as QCalendarMonth from '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.js';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';

import 'quasar/src/css/index.sass';
import '@quasar/quasar-ui-qcalendar/src/css/calendar-month.sass';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  QCalendarMonth
});
app.mount('#app');
