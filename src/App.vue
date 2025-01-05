<script setup lang="ts">
import ReloadPWA from "./components/ReloadPWA.vue";
</script>

<template>
  <ReloadPWA/>
  <v-responsive>
    <v-app full-height>
      <v-main>
        <RouterView/>
      </v-main>
    </v-app>
  </v-responsive>
</template>


<style scoped lang="scss">

</style>
