<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const fileUpload = ref()

function triggerFileUpload() {
  fileUpload.value.click()
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    console.log("file", file)
  }
}
</script>

<template>
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
         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
</template>

<style scoped>

</style>
