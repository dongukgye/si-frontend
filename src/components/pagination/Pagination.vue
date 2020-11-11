<template>
  <div class="flex-1 flex items-center justify-between">
    <div>
      <p class="text-sm leading-5 text-gray-700">
        Showing
        <span class="font-medium">{{ showingFrom }}</span>
        to
        <span class="font-medium">{{ showingTo }}</span>
        of
        <span class="font-medium">{{ totalCount }}</span>
        results
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex shadow-sm">
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Previous"
          @click="prevPage"
        >
          <!-- Heroicon name: chevron-left -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#"
          class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Next"
          @click="nextPage"
        >
          <!-- Heroicon name: chevron-right -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { usePagination } from "@/components/hooks/usePagination";

export default defineComponent({
  setup(props, context) {
    const { totalCount, pageSize, currentPage } = usePagination();

    const totalPage = computed(() => {
      return totalCount.value % pageSize.value === 0
        ? totalCount.value / pageSize.value
        : totalCount.value / pageSize.value + 1;
    });

    const showingFrom = computed(() => {
      return (currentPage.value - 1) * pageSize.value + 1;
    });

    const showingTo = computed(() => {
      return currentPage.value * pageSize.value;
    });

    const hasPrevPage = computed(() => {
      currentPage.value > 1;
    });

    const hasNextPage = computed(() => {
      currentPage.value < totalPage.value;
    });

    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    }

    function nextPage() {
      if (currentPage.value < totalPage.value) {
        currentPage.value += 1;
      }
    }

    return {
      totalPage,
      totalCount,
      showingFrom,
      showingTo,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped></style>
