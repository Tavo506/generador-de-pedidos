import {computed, ref} from "vue";

export function useDevice() {
    const screenWidth = ref(window.innerWidth);
    const isMobile = computed(() => screenWidth.value < 768)

    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
    });

    return {
        screenWidth,
        isMobile,
    }
}

export default useDevice
