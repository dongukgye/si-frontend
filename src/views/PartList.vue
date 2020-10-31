<template>
  <div>
    <Title title="Part List" />
    <DataTable :headers="headers" :data="items" selectable>
      <template v-slot:col_quantity="{ item }">
        <div class="flex items-center">
          <div class="w-2 h-2 mx-2 bg-blue-300 rounded-full"></div>
          {{ item.quantity }}
        </div>
      </template>
      <template v-slot:col_action="{ item }">
        <button
          @click="editItem(item)"
          class="px-4 py-1 bg-indigo-500 hover:bg-indigo-800 text-white text-sm font-semibold rounded-md shadow-md"
        >
          수정
        </button>
      </template>
    </DataTable>
    <Modal v-if="isOpenModal" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import PartService from "@/services/partService";
import Title from "@/components/base/Title.vue";
import Modal from "@/components/base/Modal.vue";
import DataTable from "@/components/base/DataTable.vue";
import { useModal } from "@/components/hooks/useModal";
import { IItem } from "@/services/core/interfase";

export default defineComponent({
  components: {
    Title,
    Modal,
    DataTable,
  },
  setup() {
    const { isOpenModal } = useModal();
    const items = ref<IItem[]>([]);
    const headers = ref([
      { text: "Name", value: "name" },
      { text: "Description", value: "desc" },
      { text: "Spec", value: "spec" },
      { text: "Quantity", value: "quantity" },
      { text: "Ideal quantity", value: "ideal_quantity" },
      { text: "Action", value: "action" },
    ]);

    function editItem(item: any) {
      isOpenModal.value = !isOpenModal.value;
      console.log("edit item", item.category);
    }

    onMounted(() => {
      PartService.getParts().then(
        (data) => {
          items.value = data.results;
        },
        (err) => {
          console.log(err);
        }
      );
    });

    return { items, isOpenModal, headers, editItem };
  },
});
</script>

<style scoped></style>
