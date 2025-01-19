<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useFileReader} from "../composables/useFileReader";
import {useOrdersStore} from "../stores/orders";
import {useLocalStorage} from "@vueuse/core";

const storageOrderName = useLocalStorage('last-order-name', '')
const storageOrderInProgress = useLocalStorage('last-order', false)

const router = useRouter()
const fileUpload = ref()
const {readExcel} = useFileReader()
const ordersStore = useOrdersStore()

const showContinueModal = ref(false)

function triggerFileUpload() {
  fileUpload.value.click()
}

async function handleFileUpload(event) {
  try {
    const file = event.target.files[0];
    if (file) {
      const name = file.name.split('.').slice(0, -1).join('.')
      const data = await readExcel(file)
      ordersStore.setItems(data)
      ordersStore.setOrderName(name)
      await router.push("/list")
    }
  } catch (error) {
    alert(error.message)
    console.error(error)
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

        <v-row>
          <v-col cols="6">
            <v-btn block class=" mb-8">
              Cargar Pedido
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block class=" mb-8">
              Pedidos Generados
            </v-btn>
          </v-col>
        </v-row>

        <v-spacer/>

        <v-btn block class="">
          Preferencias
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
        v-model="showContinueModal"
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

          <v-btn @click="showContinueModal = false">No</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Hidden input for the files -->
  <input ref="fileUpload" type="file" class="hidden" @change="handleFileUpload"
         accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
</template>

<style scoped>

</style>
