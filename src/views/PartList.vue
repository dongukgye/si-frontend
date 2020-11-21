<template>
  <div>
    <Title title="Part List" />
    <div class="h-auto shadow-2xs overflow-x-auto rounded-lg relative">
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
      <Modal v-if="isOpenModal1" />
    </div>
    <Slider />
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, defineComponent } from "vue";
import PartService from "@/services/partService";
import Title from "@/components/base/Title.vue";
import Modal from "@/components/base/Modal.vue";
import DataTable from "@/components/table/DataTable.vue";
import Slider from "@/components/slider/Slider.vue";
import { useOpenState } from "@/components/hooks/useOpenState";
import { usePagination } from "@/components/hooks/usePagination";
import { IItem } from "@/services/core/interfase";

export default defineComponent({
  components: {
    Title,
    Modal,
    Slider,
    DataTable,
  },
  setup() {
    const { isOpenSlider } = useOpenState();
    const { totalCount } = usePagination();
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
      isOpenSlider.value = true;
      console.log("edit item", item.category);
    }

    function fetchData(params: any) {
      PartService.getParts(params).then(
        (data) => {
          items.value = data;
          totalCount.value = items.value.length;
        },
        (err) => {
          console.log(err);
        }
      );
    }

    onMounted(() => {
      fetchData({});
    });

    return {
      items,
      headers,
      editItem,
    };
  },
});
</script>

<style scoped></style>
