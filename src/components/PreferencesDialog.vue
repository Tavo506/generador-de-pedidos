<script setup lang="ts">
import {useLocalStorage} from "@vueuse/core";
import {ref} from "vue";

const dialog = defineModel<boolean>({required: true})

const storageCommerce = useLocalStorage('preferences-commerce', '')
const storageName = useLocalStorage('preferences-name', '')
const storagePhone = useLocalStorage('preferences-phone', '')
const storageEmail = useLocalStorage('preferences-email', '')
const storageActivityCode = useLocalStorage('preferences-activity-code', '')
const storageCountWarning = useLocalStorage('preferences-count-warning', 99)
const storageDisplayProgress = useLocalStorage('preferences-display-progress', true)
const storageDisplayProgressOnPages = useLocalStorage('preferences-display-progress-on-pages', 5)

const commerce = ref(storageCommerce.value)
const name = ref(storageName.value)
const phone = ref(storagePhone.value)
const email = ref(storageEmail.value)
const activityCode = ref(storageActivityCode.value)
const countWarning = ref(storageCountWarning.value)
const displayProgress = ref(storageDisplayProgress.value)
const displayProgressOnPages = ref(storageDisplayProgressOnPages.value)


function save() {
  storageCommerce.value = commerce.value
  storageName.value = name.value
  storagePhone.value = phone.value
  storageEmail.value = email.value
  storageActivityCode.value = activityCode.value
  storageCountWarning.value = countWarning.value
  storageDisplayProgress.value = displayProgress.value
  storageDisplayProgressOnPages.value = displayProgressOnPages.value

  dialog.value = false
}
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
      <v-card
          prepend-icon="fa-user"
          title="Preferencias"
          subtitle="Contenido para el encabezado del pedido generado"
      >
        <v-card-text>
          <h3 class="font-weight-bold mb-2">Información del negocio</h3>
          <v-row dense>
            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  label="Negocio"
                  hint="Nombre de tu negocio"
                  v-model="commerce"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  label="Nombre"
                  v-model="name"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  label="Teléfono"
                  type="tel"
                  v-model="phone"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  label="Email"
                  type="email"
                  v-model="email"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  label="Código de Actividad Económica"
                  v-model="activityCode"
              ></v-text-field>
            </v-col>
          </v-row>

          <h3 class="font-weight-bold my-2">Preferencias del pedido</h3>
          <v-row dense>
            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  label="Advertencia de cantidad"
                  hint="Mostrar una advertencia si se digita una cantidad mayor a esta"
                  type="number"
                  min="1"
                  v-model="countWarning"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
              <div class="flex justify-center">
                <v-text-field
                    label="Mostrar progreso"
                    hint="Mostrar el progreso en listas de más de estas páginas"
                    type="number"
                    min="1"
                    v-model="displayProgressOnPages"
                    :disabled="!displayProgress"
                ></v-text-field>
                <v-checkbox-btn v-model="displayProgress" color="primary" class="h-[56px]"></v-checkbox-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Cerrar"
              variant="plain"
              @click="dialog = false"
          ></v-btn>

          <v-btn
              color="primary"
              text="Guardar"
              variant="tonal"
              @click="save"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>
