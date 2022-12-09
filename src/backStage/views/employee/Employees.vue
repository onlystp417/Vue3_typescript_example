<template>
  <div class="employees">
    <h2 class="employee__title text-h5">設定 &#62; 人員管理</h2>
    <div class="employees__tool row justify-between q-mb-md">
      <q-btn color="primary" label="新增" icon="add" @click="$router.push({ name: 'Employee' })" />
      <q-btn color="primary" label="匯入多筆" icon="post_add" />
    </div>
    <q-table :rows="employeeStore.employees" row-key="name" />
  </div>
</template>

<script setup>
import { useEmployeeStore } from '@/stores/useEmployeeStore.js';

const employeeStore = useEmployeeStore();
</script>

<style lang="scss" scoped></style>
