<template>
  <div class="home">
    <Header class="home__header" />
    <q-layout>
      <q-page-container class="q-pa-xl">
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import Header from '..//components/Header.vue';
</script>

<style lang="scss" scoped>
.home {
  &__header {
    position: sticky;
    top: 0;
    z-index: 9;
  }
}
</style>
