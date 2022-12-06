<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <h1>Clinic System</h1>
  <div class="q-pa-md q-gutter-sm a_box">
    <q-btn color="primary" style="width: 300px">
      <div class="ellipsis">
        <RouterLink to="/liff">前台入口處</RouterLink>
      </div>
    </q-btn>
    <q-btn color="primary" style="width: 300px">
      <div class="ellipsis">
        <div class="apple">
          <RouterLink to="/admin">後台入口處</RouterLink>
        </div>
      </div>
    </q-btn>
  </div>

  <RouterView />
</template>

<style lang="scss">
.a_box {
  display: flex;
  justify-content: space-evenly;
}

a {
  padding: 5px 50px;
  font-size: 2rem;
  line-height: 50px;
  text-decoration: none;
  color: #fff;
}
</style>
