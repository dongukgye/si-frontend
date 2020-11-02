<template>
  <div class="shadow overflow-x-auto border-b border-gray-200 rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            v-if="selectable"
            class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            <input
              type="checkbox"
              class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
          </th>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            <slot name="header" :header="header">
              {{ header.text }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(item, i) in data"
          :key="i"
          class="hover:bg-gray-100 hover:bg-opacity-30"
          :class="striped && i % 2 == 0 ? `bg-gray-100` : ``"
        >
          <td
            v-if="selectable"
            class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            <input
              type="checkbox"
              class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
          </td>
          <td
            v-for="(header, j) in headers"
            :key="j"
            class="px-6 py-2 whitespace-no-wrap text-gray-600"
          >
            <slot :name="`col_${header.value}`" :item="item" :header="header">
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="px-6 py-2 bg-white border-t flex items-center">
      <span>1~10 in {{ totalCount }}</span>
      <span>total page is {{ currentPage }} / {{ totalPage }}</span>
      <div class="flex inline-flex">
        <div>
          <button
            @click="prevPage"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div>
          <button
            @click="nextPage"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, toRefs, PropType } from "vue";

export default defineComponent({
  props: {
    headers: Array,
    data: Array,
    striped: Boolean,
    selectable: Boolean,
    totalCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const totalPage = computed(() => {
      return props.totalCount % props.pageSize === 0
        ? props.totalCount / props.pageSize
        : props.totalCount / props.pageSize + 1;
    });

    const hasPrevPage = computed(() => {
      props.currentPage > 1;
    });

    const hasNextPage = computed(() => {
      props.currentPage < totalPage.value;
    });

    function prevPage() {
      context.emit("prev-page");
    }

    function nextPage() {
      context.emit("next-page");
    }

    return {
      totalPage,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped></style>
