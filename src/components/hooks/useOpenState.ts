import { reactive, toRefs } from 'vue'

const state = reactive({
    isOpenModal: false,
    isOpenSlider: false,
    isOpenSidebar: false
})

export function useOpenState() {
    return {
        ...toRefs(state)
    }
}