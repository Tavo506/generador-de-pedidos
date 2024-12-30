<script setup lang="ts">

</script>

<template>
<div class="w-full h-full pt-20 px-8 max-w-[1366px] mx-auto">
  <h1 class="text-6xl text-center mb-16">Generador de Pedidos</h1>
  <div class="grid lg:grid-cols-2 gap-4 lg:gap-6">
    <div class="max-lg:hidden">
      <img src="@/favicon.png" alt="Logo" class="h-48 w-48" />
    </div>
    <div class="flex flex-col gap-4">
      <button class="btn-gradient w-full h-24 text-white">
        Crear Pedido
      </button>
      <div class="grid grid-cols-2 gap-4">
        <button class="btn-gradient w-full h-full text-white">
          Cargar Pedido
        </button>
        <button class="btn-gradient w-full h-12 text-white">
          Pedidos Generados
        </button>
      </div>
      <button class="btn-gradient w-full h-12 text-white">
        Preferencias
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
