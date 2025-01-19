<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import {useOrdersStore} from "../stores/orders";
import {ref, toRaw, watch} from "vue";
import {Item} from "../types/types";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRouter} from "vue-router";
import {useLocalStorage} from "@vueuse/core";
import {useFileWriter} from "../composables/useFileWriter";

// Local Storage to save the progress of the orders
const storageOrderName = useLocalStorage('last-order-name', '')
const storageOrderItems = useLocalStorage('last-order-items', [])
const storageOrderPage = useLocalStorage('last-order-page', 1)
const storageOrderInProgress = useLocalStorage('last-order', false)

const router = useRouter()
const {exportOrderAsTxt} = useFileWriter()

const ordersStore = useOrdersStore()
const itemNames: string[] = toRaw(ordersStore.items)
const fileName = ref<string>(ordersStore.orderName)

const items = ref<Item[]>(itemNames.map(item => ({name: item, quantity: 0})))

// If no file was loaded and the flag for order in progress is set on true, is that the app was closed
// while an order was in progress or the last order was opened
if (storageOrderInProgress.value) {
  fileName.value = storageOrderName.value
  items.value = storageOrderItems.value
} else if (ordersStore.orderLoaded) {
  storageOrderName.value = fileName.value
  storageOrderItems.value = items.value
  storageOrderInProgress.value = true
} else { // If the page was accessed without data, go back to the Homepage
  router.push('/')
}

const page = ref(storageOrderPage ?? 1)
const pages = Math.ceil(items.value.length / 20)

const showErrorModal = ref(false)

function saveOrder() {
  const filteredItems = items.value.filter((item: Item) => item.quantity > 0)

  if (filteredItems.length === 0) {
    showErrorModal.value = true
    return
  }

  const date = new Date().toLocaleDateString('en-GB').replaceAll('/', '-')
  const orderName = `${fileName.value}_${date}`

  exportOrderAsTxt(filteredItems, orderName)
}

watch(items.value, () => {
  storageOrderItems.value = items.value
})

watch(page, () => {
  storageOrderPage.value = page.value
})

onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm('¿Seguro que quieres salir?')
  if (answer) {
    storageOrderInProgress.value = false
    next()
  } else {
    next(false)
  }
})
</script>

<template>
  <navbar>
    <template #append>
      <v-btn size="x-large" variant="elevated" base-color="blue" append-icon="fa-download" @click="saveOrder">Exportar
      </v-btn>
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
                  aria-hidden="false"
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
