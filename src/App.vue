<script lang="ts">
import {defineComponent} from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import ReloadPWA from "./components/ReloadPWA.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    ReloadPWA,
  },
});
</script>

<template>
  <ReloadPWA/>
  <img alt="Vue logo" src="./assets/vue.svg"/>
  <HelloWorld msg="Hello Vue 3 + Vite"/>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
