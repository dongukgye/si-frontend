import { reactive, toRefs } from "vue";

const state = reactive({
  isOpenModal: false
})

export function useModal() {
  return {
    ...toRefs(state)
  }
}