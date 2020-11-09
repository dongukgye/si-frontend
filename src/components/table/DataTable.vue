<template>
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
          class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
        >
          <slot name="header" :header="header">
            {{ header.text }}
          </slot>
        </th>
      </tr>
    </thead>

    <tfoot>
      <tr>
        <td colspan="100%" class="p-0">
          <div class="px-6 py-3 bg-white">
            <Pagination
              :totalCount="totalCount"
              :pageSize="pageSize"
              :currentPage="currentPage"
            />
          </div>
        </td>
      </tr>
    </tfoot>

    <tbody class="bg-white divide-y divide-gray-200">
      <tr
        v-for="(item, i) in data"
        :key="i"
        class="hover:bg-gray-100 hover:bg-opacity-30"
        :class="striped && i % 2 == 0 ? `bg-gray-100` : ``"
      >
        <td
          v-if="selectable"
          class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
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
</template>

<script lang="ts">
import { ref, computed, defineComponent, toRefs, PropType } from "vue";
import Pagination from "@/components/pagination/Pagination.vue";

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
  components: {
    Pagination,
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
