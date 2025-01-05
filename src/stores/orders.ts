import {defineStore} from "pinia";
import {ref} from "vue";

export const useOrdersStore = defineStore('orders', () => {
    const items = ref([])  // The items of the readed file

    function setItems(newItems) {
        items.value = newItems
    }

    return {
        items,
        setItems,
    }
})
