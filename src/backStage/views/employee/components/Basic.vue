<template>
  <div class="basic">
    <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-lg">
      <div class="col-12 row">
        <q-input outlined dense v-model="text" label="帳號" class="col-5 q-mr-lg" />
        <q-btn color="secondary" label="檢查帳號是否重複" class="col-3" />
      </div>
      <q-select
        outlined
        dense
        v-model="model"
        :options="['Google', 'Facebook']"
        label="部門"
        class="col-6"
      />
      <q-input outlined dense v-model="text" label="員工編號" class="col-6" />
      <q-select
        outlined
        dense
        v-model="model"
        :options="['Google', 'Facebook']"
        label="狀態"
        class="col-6"
      />
      <q-input outlined dense value="2022/12/08" mask="date" label="到職日" class="col-6">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy>
              <q-date v-model="date" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input outlined dense v-model="text" label="分類" class="col-6" />
      <q-input outlined dense value="2022/12/08" mask="date" label="離職日" class="col-6">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy>
              <q-date v-model="date" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input outlined dense v-model="text" label="職稱" class="col-6" />
      <q-select
        outlined
        dense
        v-model="model"
        :options="['Google', 'Facebook']"
        label="職務"
        class="col-6"
      />
      <div class="col-12 row">
        <q-select
          outlined
          dense
          v-model="model"
          :options="['Google', 'Facebook']"
          label="看診專科"
          class="col-6 q-mr-lg"
        />
        <q-btn icon="add" class="col-1" />
      </div>
      <q-input v-model="text" outlined dense type="textarea" label="專長/次專科" class="col-12" />
      <q-input v-model="text" outlined dense type="textarea" label="經歷" class="col-12" />

      <div class="col-12">
        <q-btn label="儲存" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(false);

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted',
    });
  }
}

function onReset() {
  name.value = null;
  age.value = null;
  accept.value = false;
}
</script>

<style lang="scss" scoped></style>
