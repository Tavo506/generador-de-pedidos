<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import {useOrdersStore} from "../stores/orders";
import {ref, toRaw, watch} from "vue";
import useDevice from "../composables/useDevice";

const ordersStore = useOrdersStore()
const items: string[] = toRaw(ordersStore.items);
// const items: string[] = [...Array(200).keys()];

const page = ref(1)
const pages = Math.ceil(items.length / 20)

</script>

<template>
  <navbar></navbar>
  <v-container>
    <h1 class="text-2xl">This is the page to fill the list</h1>
    <v-data-iterator :items="items" items-per-page="20" :page="page">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <p>{{ item.raw }}</p>
        </template>
      </template>
    </v-data-iterator>
    <div class="max-w-[550px] mx-auto">
      <v-pagination :length="pages" v-model="page"></v-pagination>
    </div>
  </v-container>
</template>

<style scoped>

</style>
