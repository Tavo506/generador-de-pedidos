<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-btn @click="goBack" icon="fas fa-arrow-left"></v-btn>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
