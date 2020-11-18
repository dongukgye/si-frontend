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
            v-model="selectAll"
            class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            :class="semiSelected ? `form-checkbox-semi` : ``"
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
            <Pagination />
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
            :id="item.id"
            :value="item"
            v-model="selectedItems"
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
    // - TODO: implement client side pagination and sorting (because of select all feature for sst is suck)

    const selectedItems = ref(Array<any>());
    const semiSelected = computed(() => {
      return (
        0 < selectedItems.value.length &&
        selectedItems.value.length < props.data.length
      );
    });
    const selectAll = computed({
      get: () =>
        selectedItems.value.length
          ? selectedItems.value.length === props.data.length
          : false,
      set: (isSelectAll) => {
        const selected: Array<any> = [];
        if (isSelectAll) {
          props.data.forEach((item: any) => {
            selected.push(item);
          });
        }
        selectedItems.value = selected;
      },
    });
    return {
      selectAll,
      semiSelected,
      selectedItems,
    };
  },
});
</script>

<style scoped></style>
