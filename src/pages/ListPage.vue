<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import {useOrdersStore} from "../stores/orders";
import {ref, toRaw, watch} from "vue";
import {Item} from "../types/types";

const ordersStore = useOrdersStore()
const itemNames: string[] = toRaw(ordersStore.items)
const fileName: string = ordersStore.orderName

const items = ref<Item[]>(itemNames.map(item => ({name: item, quantity: 0})))

const page = ref(1)
const pages = Math.ceil(items.value.length / 20)

const showErrorModal = ref(false)

function saveOrder() {
  const filterItems = items.value.filter((item: Item) => item.quantity > 0)

  if (filterItems.length === 0) {
    showErrorModal.value = true
    return
  }

  const header = `SUPER MARÍA AUXILIADORA\nGustavo Blanco Rojas\nTel: 2463-1546\nCorreo: tavobr1973@gmail.com\n\n`
  const content = filterItems.map(item => `${item.name}: ${item.quantity}`).join('\n')
  const fileContent = header + content
  const date = new Date().toLocaleDateString('en-GB').replaceAll('/', '-')

  // Create the content as a Blob
  const blob = new Blob([fileContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Create the download link
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}_${date}.txt`;
  document.body.appendChild(a);
  a.click();

  // Clear
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

</script>

<template>
  <navbar>
    <template #append>
      <v-btn size="x-large" variant="elevated" base-color="blue" append-icon="fa-download" @click="saveOrder">Save</v-btn>
    </template>
  </navbar>
  <v-container>
    <v-data-iterator :items="items" items-per-page="20" :page="page">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <div class="flex align-center p-2" :class="{'bg-blue-grey-lighten-5': i % 2 === 0}">
            <div class="flex-1">
              <p>{{ item.raw.name }}</p>
            </div>
            <div class="flex-shrink-0">
              <v-number-input
                  :reverse="false"
                  controlVariant="split"
                  hide-details
                  :inset="false"
                  variant="outlined"
                  v-model="item.raw.quantity"
                  :min="0"
                  :bg-color="item.raw.quantity ? 'green-lighten-3' : ''"
              ></v-number-input>
            </div>
          </div>
        </template>
      </template>
    </v-data-iterator>
    <div class="max-w-[550px] mx-auto">
      <v-pagination :length="pages" v-model="page"></v-pagination>
    </div>
    <v-dialog
        v-model="showErrorModal"
        width="auto"
    >
      <v-card
          max-width="400"
          prepend-icon="fa-warning"
          text="No has seleccionado ningún producto"
          title="Orden vacía"
          color="amber-darken-1"
      >
        <template v-slot:actions>
          <v-btn
              class="ms-auto"
              text="Ok"
              @click="showErrorModal = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>

</style>
