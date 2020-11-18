<template>
  <div>
    <Title title="Part List" />
    <div class="shadow-2xs overflow-x-auto rounded-lg">
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
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, defineComponent } from "vue";
import PartService from "@/services/partService";
import Title from "@/components/base/Title.vue";
import Modal from "@/components/base/Modal.vue";
import DataTable from "@/components/table/DataTable.vue";
import { useModal } from "@/components/hooks/useModal";
import { usePagination } from "@/components/hooks/usePagination";
import { IItem } from "@/services/core/interfase";

export default defineComponent({
  components: {
    Title,
    Modal,
    DataTable,
  },
  setup() {
    const { isOpenModal } = useModal();
    const { totalCount, currentPage } = usePagination();
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

    function fetchData(params: any) {
      PartService.getParts(params).then(
        (data) => {
          items.value = data.results;
          totalCount.value = data.count;
        },
        (err) => {
          console.log(err);
        }
      );
    }

    watch(
      () => currentPage.value,
      (value) => {
        console.log("fetch data for page ", value);
        fetchData({ page: value });
      }
    );

    onMounted(() => {
      fetchData({ page: currentPage.value });
    });

    return {
      items,
      currentPage,
      isOpenModal,
      headers,
      editItem,
    };
  },
});
</script>

<style scoped></style>
