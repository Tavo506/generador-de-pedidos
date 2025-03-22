<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import PreferencesDialog from "../components/PreferencesDialog.vue";
import {useFileReader} from "../composables/useFileReader";
import {useOrdersStore} from "../stores/orders";
import {useLocalStorage} from "@vueuse/core";
import {Item} from "../types/types";

const storageOrderItems = useLocalStorage('last-order-items', '')
const storageOrderName = useLocalStorage('last-order-name', '')
const storageOrderPage = useLocalStorage('last-order-page', 0)
const storageOrderInProgress = useLocalStorage('last-order', false)

const router = useRouter()
const fileUpload = ref()
const orderUpload = ref()
const {readExcel, readText} = useFileReader()
const ordersStore = useOrdersStore()

const showContinueDialog = ref(false)
const showPreferencesDialog = ref(false)

function triggerFileUpload() {
  fileUpload.value.click()
}

function triggerOrderUpload() {
  orderUpload.value.click()
}

async function handleFileUpload(event) {
  try {
    const file = event.target.files[0];
    if (file) {
      const name = file.name.split('.').slice(0, -1).join('.')
      const data = await readExcel(file)
      ordersStore.setItems(data)
      ordersStore.setOrderName(name)
      storageOrderInProgress.value = false
      await router.push("/list")
    }
  } catch (error) {
    alert(error.message)
    console.error(error)
  }
}

async function handleOrderUpload(event) {
  try {
    const file = event.target.files[0];
    if (file) {
      const name = file.name.split('.').slice(0, -1).join('.')
      const data = await readText(file)
      const filteredData = formatOrderData(data)
      console.group("Filtered Data")
      console.log(filteredData)
      console.log(typeof filteredData)
      console.log(JSON.stringify(filteredData))
      console.groupEnd()
      storageOrderItems.value = JSON.stringify(filteredData)
      storageOrderName.value = name
      storageOrderPage.value = 1
      storageOrderInProgress.value = true
      await router.push("/list")
    }
  } catch (error) {
    alert(error.message)
    console.error(error)
  }
}

// TODO Esto no sirve, es necesario guardar un nuevo tipo de archivo con la información de la orden completa porque se ocupa lo que sea 0
/**
 * Take the content of an existing order and format as the data for the form
 * @param data
 */
function formatOrderData(data: string) {
  try {
    const splitData = data.split('\n\n')
    const orderData = splitData.length > 1 ? splitData[1] : splitData[0]  // If there is a header, ignore it
    const items: Item[] = orderData.split('\n').map((line: string): Item => {
      const splitLine = line.split(' : ')
      if (splitLine.length < 2) return // Invalid line
      const [quantity, name] = [splitLine.shift(), splitLine.join(' : ')]  // Prevent if an item has the same divider on the name
      return {name, quantity}
    }).filter(item => item)

    if (items.length > 0 && Object.keys(items[0]).length === 2 ) return items  // Verify if the response is a valid order file
    throw new Error('Invalid order data')

  } catch (error) {
    console.log(error)
    throw new Error('Error al leer el archivo, verifica que es una orden válida')
  }
}

async function openLastOrder() {
    storageOrderInProgress.value = true
    await router.push("/list")
}

onMounted(() => {
  if (storageOrderInProgress.value) {
    showContinueDialog.value = true
  }
})
</script>

<template>
  <v-app-bar :elevation="0">
  </v-app-bar>
  <v-container min-height="100%">
    <h1 class="text-6xl text-center mb-16">Generador de Pedidos</h1>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="flex justify-center">
        <img src="@/favicon.png" alt="Logo" class="h-48 w-48 object-contain"/>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn block class=" mb-8" size="x-large" @click="triggerFileUpload">
          Crear Pedido
        </v-btn>

        <v-btn block class=" mb-8" size="large" @click="openLastOrder" :disabled="!storageOrderName">
          Cargar Último Pedido
        </v-btn>

        <v-btn block class=" mb-8" @click="triggerOrderUpload">
          Cargar Pedido
        </v-btn>

        <v-spacer/>

        <v-btn block @click="showPreferencesDialog = true">
          Preferencias
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
        v-model="showContinueDialog"
        width="auto"
    >
      <v-card
          max-width="400"
          prepend-icon="fa-warning"
          text="La aplicación se cerró mientras un pedido estaba en curso ¿Quieres continuar donde lo dejaste?"
          title="¿Continuar pedido anterior?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="openLastOrder()">Sí</v-btn>

          <v-btn @click="showContinueDialog = false">No</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <PreferencesDialog v-model="showPreferencesDialog"></PreferencesDialog>
  </v-container>

  <!-- Hidden input for the files -->
  <input ref="fileUpload" type="file" class="hidden" @change="handleFileUpload"
         accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
  <input ref="orderUpload" type="file" class="hidden" @change="handleOrderUpload"
         accept="text/plain"/>
</template>

<style scoped>

</style>
