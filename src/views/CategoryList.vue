<template>
  <div>
    <Title title="Category List" />
    <DataTable :headers="headers" :data="data" striped>
      <template v-slot:col_action="{ item }">
        <button
          @click="editItem(item)"
          class="px-4 py-1 bg-indigo-500 hover:bg-indigo-800 text-white font-semibold rounded-md shadow-md"
        >
          EDIT
        </button>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Title from "@/components/base/Title.vue";
import DataTable from "@/components/table/DataTable.vue";

export default defineComponent({
  components: {
    Title,
    DataTable,
  },
  setup() {
    const headers = ref([
      { text: "Category", value: "category" },
      { text: "Part Count", value: "count", sortable: true },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" },
    ]);
    const data = ref([
      { category: "Nut", count: 128, status: "OK" },
      { category: "Bolt", count: 310, status: "Lack" },
      { category: "Washaer", count: 28, status: "OK" },
    ]);
    return {
      headers,
      data,
    };
  },
});
</script>

<style scoped></style>
