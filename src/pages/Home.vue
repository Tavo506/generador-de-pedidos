<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useFileReader} from "../composables/useFileReader";
import {useOrdersStore} from "../stores/orders";

const router = useRouter()
const fileUpload = ref()
const {readExcel} = useFileReader()
const ordersStore = useOrdersStore()

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
</script>

<template>
  <v-app-bar :elevation="0">
  </v-app-bar>
  <v-container min-height="100%">
    <h1 class="text-6xl text-center mb-16">Generador de Pedidos</h1>
    <v-row align="center" justify="center">
      <v-col cols="6" class="max-lg:hidden flex justify-center">
        <img src="@/favicon.png" alt="Logo" class="h-48 w-48"/>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn block class=" mb-8" size="x-large" @click="triggerFileUpload">
          Crear Pedido
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
  </v-container>

  <!-- Hidden input for the files -->
  <input ref="fileUpload" type="file" class="hidden" @change="handleFileUpload"
         accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
</template>

<style scoped>

</style>
