import { computed, reactive, toRefs } from "vue";

const state = reactive({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
})

const totalPage = computed(() => {
    return state.totalCount % state.pageSize === 0
        ? state.totalCount / state.pageSize
        : state.totalCount / state.pageSize + 1;
});

const showingFrom = computed(() => {
    return (state.currentPage - 1) * state.pageSize + 1
})

const showingTo = computed(() => {
    return state.currentPage * state.pageSize < state.totalCount ?
        state.currentPage * state.pageSize : state.totalCount
})

const hasPrevPage = computed(() => {
    return state.currentPage > 1;
});

const hasNextPage = computed(() => {
    return state.currentPage < totalPage.value;
});

function initPagination(totalCount: number) {
    state.currentPage = 1
    state.pageSize = 10
    state.totalCount = totalCount
}

function getPaginatedItems(data: Array<any>) {
    return data.slice(showingFrom.value - 1, showingTo.value)
}

export function usePagination() {
    return {
        ...toRefs(state),
        totalPage,
        showingFrom,
        showingTo,
        hasPrevPage,
        hasNextPage,
        initPagination,
        getPaginatedItems
    }
}