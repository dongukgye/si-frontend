<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            <slot name="header" :header="header">
              {{ header.value }}
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
            v-for="(header, j) in headers"
            :key="j"
            class="px-6 py-4 whitespace-no-wrap text-gray-800"
          >
            <slot :name="`col_${header.value}`" :item="item" :header="header">
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    headers: Array,
    data: Array,
    striped: Boolean,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
