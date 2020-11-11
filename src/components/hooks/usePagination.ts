import { reactive, toRefs } from "vue";

const state = reactive({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
})

export function usePagination() {
    return {
        ...toRefs(state)
    }
}