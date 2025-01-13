import {defineStore} from "pinia";
import {ref} from "vue";

export const useOrdersStore = defineStore('orders', () => {
    const items = ref([])  // The items of the read file
    const orderName = ref('')

    function setItems(newItems) {
        items.value = newItems
    }

    function setOrderName(newOrderName) {
        orderName.value = newOrderName
    }

    return {
        items,
        orderName,
        setItems,
        setOrderName
    }
})
