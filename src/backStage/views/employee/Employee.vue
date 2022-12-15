<template>
  <div class="employee">
    <h2 class="employee__title text-h5">設定 &#62; 人員新增</h2>
    <q-card>
      <q-tabs v-model="tab" align="justify" narrow-indicator class="text-teal">
        <q-tab name="basic" label="一般資料" />
        <q-tab name="licenseForm" label="相關證照" />
        <q-tab name="shift" label="個人班表" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab">
        <q-tab-panel :name="tab">
          <component :is="tabComponents[tab]"></component>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Basic from './components/Basic.vue';
import Licenses from './components/Licenses.vue';
import Shift from './components/Shift.vue';
// import { useEmployeeStore } from '@/stores/useEmployeeStore.js';
// const employeeStore = useEmployeeStore();
const tab = ref('basic');
const tabComponents = {
  basic: Basic,
  licenseForm: Licenses,
  shift: Shift,
};
</script>

<style lang="scss" scoped></style>
