<template>
  <div class="flex items-center justify-end text-xs font-light text-gray-700">
    <div class="flex items-center">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <p class="mr-4">
        페이지 당 건수
      </p>

      <!-- Page Size Dropdown -->
      <div class="relative inline-block text-left mr-4">
        <div>
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-light hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            @click="openPageSizeDropdown = !openPageSizeDropdown"
          >
            <p>
              {{ pageSize }}
            </p>
            <!-- Heroicon name: chevron-down -->
            <svg
              class="-mr-1 ml-2 h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          :class="
            `origin-top-right absolute right-0 bottom-0 mb-12 w-full rounded-md shadow-2xs bg-white ring-1 ring-black ring-opacity-5 transform transition ${
              openPageSizeDropdown
                ? `opacity-100 scale-100 ease-out duration-100`
                : `opacity-0 scale-95 ease-in duration-75`
            }`
          "
        >
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              v-for="(ps, i) in pageSizes"
              :key="i"
              href="#"
              class="block px-4 py-2 text-xs hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click="setPageSize(ps.value)"
              >{{ ps.key }}</a
            >
          </div>
        </div>
      </div>

      <div class="mr-4">
        <p class="leading-5">
          <span>{{ totalCount }} 중 {{ showingFrom }}-{{ showingTo }}</span>
        </p>
      </div>

      <nav class="relative z-0 inline-flex shadow-sm">
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Previous"
          @click="prevPage"
        >
          <!-- Heroicon name: chevron-left -->
          <svg
            class="h-4 w-4"
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
            class="h-4 w-4"
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
import { computed, defineComponent, ref } from "vue";
import { usePagination } from "@/components/hooks/usePagination";

export default defineComponent({
  setup(props, context) {
    const openPageSizeDropdown = ref(false);
    const pageSizes = ref([
      {
        key: "5",
        value: 5,
      },
      {
        key: "10",
        value: 10,
      },
      {
        key: "15",
        value: 15,
      },
      {
        key: "전체",
        value: 0,
      },
    ]);

    const {
      totalCount,
      pageSize,
      currentPage,
      totalPage,
      showingFrom,
      showingTo,
      hasPrevPage,
      hasNextPage,
    } = usePagination();

    function setPageSize(size: number) {
      openPageSizeDropdown.value = false;
      currentPage.value = 1
      if (size === 0) {
        pageSize.value = totalCount.value;
      } else {
        pageSize.value = size;
      }
    }

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
      pageSize,
      pageSizes,
      totalCount,
      showingFrom,
      showingTo,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      setPageSize,
      openPageSizeDropdown,
    };
  },
});
</script>

<style scoped></style>
