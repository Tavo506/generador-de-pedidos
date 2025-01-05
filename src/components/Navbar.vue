<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <v-toolbar>
    <template v-slot:prepend>
      <v-btn @click="goBack" icon="fas fa-arrow-left"></v-btn>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>
