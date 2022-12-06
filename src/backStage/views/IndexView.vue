<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <h1>後台區</h1>

  <header></header>

  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
main {
  text-align: center;
}
</style>
