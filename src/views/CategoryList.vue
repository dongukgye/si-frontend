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
    <Modal v-if="isOpenModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Title from "@/components/base/Title.vue";
import Modal from "@/components/base/Modal.vue";
import DataTable from "@/components/base/DataTable.vue";
import { useModal } from "@/components/hooks/useModal";

export default defineComponent({
  components: {
    Title,
    Modal,
    DataTable,
  },
  setup() {
    const { isOpenModal } = useModal();
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
    function editItem(item: any) {
      isOpenModal.value = !isOpenModal.value;
      console.log("edit item", item.category);
    }
    return {
      isOpenModal,
      headers,
      data,
      editItem,
    };
  },
});
</script>

<style scoped></style>
