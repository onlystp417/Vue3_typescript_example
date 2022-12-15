<template>
  <div class="justify-center" style="display: flex; flex-direction: row">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('prev')"> &lt; </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('today')"> 今天 </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('next')"> &gt; </q-btn>
    </div>
  </div>
</template>
