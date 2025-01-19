<script setup lang="ts">
import {useLocalStorage} from "@vueuse/core";
import {ref} from "vue";

const dialog = defineModel<boolean>({required: true})

const storageCommerce = useLocalStorage('preferences-commerce', '')
const storageName = useLocalStorage('preferences-name', '')
const storagePhone = useLocalStorage('preferences-phone', '')
const storageEmail = useLocalStorage('preferences-email', '')

const commerce = ref(storageCommerce.value)
const name = ref(storageName.value)
const phone = ref(storagePhone.value)
const email = ref(storageEmail.value)


function save() {
  storageCommerce.value = commerce.value
  storageName.value = name.value
  storagePhone.value = phone.value
  storageEmail.value = email.value

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
