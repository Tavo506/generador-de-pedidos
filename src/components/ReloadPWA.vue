<script lang="ts">
import {defineComponent, computed} from "vue";
import {useRegisterSW} from "virtual:pwa-register/vue";

const {updateServiceWorker} = useRegisterSW();

export default defineComponent({
  name: "ReloadPWA",
  setup() {
    const {offlineReady, needRefresh, updateServiceWorker} = useRegisterSW();
    const close = async () => {
      offlineReady.value = false;
      needRefresh.value = false;
    };
    const dialog = computed(() => needRefresh.value)
    return {offlineReady, needRefresh, updateServiceWorker, close, dialog};
  },
  methods: {
    async close() {
      this.offlineReady.value = false;
      this.needRefresh.value = false;
    },
    async updateServiceWorker() {
      await updateServiceWorker();
    },
  },
});
</script>

<template>
  <v-dialog
      v-model="dialog"
      width="auto"
  >
    <v-card
        max-width="400"
        prepend-icon="fa-refresh"
        text="Actualiza el app para obtener las últimas características"
        title="Actualización disponible"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="updateServiceWorker()">Actualizar</v-btn>

        <v-btn @click="close">Cerrar</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
