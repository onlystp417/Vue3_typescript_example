import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import langTW from 'quasar/lang/zh-TW';
// @ts-ignore
import * as QCalendarMonth from '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.js';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

import 'quasar/src/css/index.sass';
import '@quasar/quasar-ui-qcalendar/src/css/calendar-month.sass';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Quasar, {
    QCalendarMonth,
    lang: langTW,
  })
  .mount('#app');
