<template>
  <table
    class="min-w-full divide-y divide-gray-200 rounded-lg shadow-2xs overflow-hidden"
  >
    <thead>
      <tr>
        <th
          v-if="selectable"
          class="px-6 py-2 bg-gray-50 text-left leading-4"
        >
          <input
            type="checkbox"
            v-model="selectAll"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300 rounded"
          />
        </th>
        <th
          v-for="(header, i) in headers"
          :key="i"
          class="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
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
          <div class="px-6 py-2 bg-white rounded-lg">
            <Pagination />
          </div>
        </td>
      </tr>
    </tfoot>

    <tbody class="bg-white divide-y divide-gray-200 text-sm">
      <tr
        v-for="(item, i) in paginatedItems"
        :key="i"
        class="hover:bg-gray-100 hover:bg-opacity-30"
        :class="striped && i % 2 == 0 ? `bg-gray-100` : ``"
      >
        <td
          v-if="selectable"
          class="px-6 py-2 bg-gray-50 text-left leading-4"
        >
          <input
            type="checkbox"
            :id="item.id"
            :value="item.id"
            v-model="selectedItems"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300 rounded"
          />
        </td>
        <td
          v-for="(header, j) in headers"
          :key="j"
          class="px-6 py-2 whitespace-no-wrap text-gray-800 font-light"
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
import { ref, computed, defineComponent } from "vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { usePagination } from "@/components/hooks/usePagination";

export default defineComponent({
  props: {
    headers: Array,
    data: {
      type: Array,
      required: true,
    },
    striped: Boolean,
    selectable: Boolean,
  },
  components: {
    Pagination,
  },
  setup(props) {
    const { getPaginatedItems } = usePagination();
    const selectedItems = ref(Array<any>());
    const selectAll = computed({
      get: () =>
        selectedItems.value.length
          ? selectedItems.value.length === props.data.length
          : false,
      set: (isSelectAll) => {
        const selected: Array<any> = [];
        if (isSelectAll) {
          props.data.forEach((item: any) => {
            selected.push(item.id);
          });
        }
        selectedItems.value = selected;
      },
    });

    const paginatedItems = computed(() => {
      return getPaginatedItems(props.data);
    });

    return {
      selectAll,
      selectedItems,
      paginatedItems,
    };
  },
});
</script>

<style scoped></style>
