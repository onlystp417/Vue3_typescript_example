<template>
  <header>
    <q-toolbar class="bg-secondary text-white shadow-2 q-py-md q-px-xl">
      <q-toolbar-title>開心診所</q-toolbar-title>

      <q-btn-dropdown stretch flat icon="settings">
        <q-list>
          <q-item
            v-for="item in menuList"
            :key="item.routeName"
            clickable
            v-close-popup
            @click="$router.push({ name: item.routeName })"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-avatar class="cursor-pointer">
        <img :src="avator" />
      </q-avatar>
    </q-toolbar>
  </header>
</template>

<script setup>
const props = defineProps({
  avator: {
    type: String,
    default: () => 'https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg',
  },
});

const menuList = [
  {
    label: '首頁',
    routeName: 'Appointment',
  },
  {
    label: '診所管理',
    routeName: 'Appointment',
  },
  {
    label: '人員管理',
    routeName: 'Employees',
  },
  {
    label: '病患管理',
    routeName: 'Appointment',
  },
  {
    label: '歷程紀錄',
    routeName: 'Appointment',
  },
  {
    label: '排班',
    routeName: 'ArrangeSchedule',
  },
];
</script>

<style lang="scss" scoped></style>
