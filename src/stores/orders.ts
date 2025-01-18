import {defineStore} from "pinia";
import {ref} from "vue";

export const useOrdersStore = defineStore('orders', () => {
    const items = ref([])  // The items of the read file
    const orderName = ref('')
    const orderLoaded = ref(false)

    function setItems(newItems) {
        items.value = newItems
        orderLoaded.value = true
    }

    function setOrderName(newOrderName) {
        orderName.value = newOrderName
        orderLoaded.value = true
    }

    return {
        items,
        orderName,
        orderLoaded,
        setItems,
        setOrderName
    }
})
