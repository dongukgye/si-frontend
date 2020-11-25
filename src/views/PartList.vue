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
    </div>
    <Slider>
      <template v-slot:header>
        This is custom header
      </template>

      <template v-slot:content>
        <div 
        v-for="(header, i) in headers"
        :key="i"
        class="col-span-6 sm:col-span-4 my-2">
          <label for="email_address" class="block text-sm font-medium text-gray-700">{{ header.text }}</label>
          <input v-model="editedItem[header.value]" type="text" id="email_address" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md">
        </div>
         <div class="py-2 bg-gray-50 text-right">
          <button 
            type="submit" 
            @click="handleUpdate"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-2xs text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            수정             
          </button>
         </div>
      </template>
    </Slider>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, defineComponent } from "vue";
import PartService from "@/services/partService";
import Title from "@/components/base/Title.vue";
// import Modal from "@/components/base/Modal.vue";
import DataTable from "@/components/table/DataTable.vue";
import Slider from "@/components/slider/Slider.vue";
// import Button from "@/components/button/Button.vue";
import { useItems } from "@/components/hooks/useItems";
// import { useOpenState } from "@/components/hooks/useOpenState";
import { usePagination } from "@/components/hooks/usePagination";
import { IItem } from "@/services/core/interfase";

export default defineComponent({
  components: {
    Title,
    // Modal,
    Slider,
    // Button,
    DataTable,
  },
  setup() {
    const { totalCount } = usePagination();
    const { items, editedItem, editedIndex, editItem, editSuccess, editFailed } = useItems();
    const headers = ref([
      { text: "Name", value: "name" },
      { text: "Description", value: "desc" },
      { text: "Spec", value: "spec" },
      { text: "Quantity", value: "quantity" },
      { text: "Ideal quantity", value: "ideal_quantity" },
      { text: "Action", value: "action" },
    ]);

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

    function handleUpdate() {
      PartService.updatePart(editedItem.value).then(
        (data) => {
          editSuccess(data);
        },
        (error) => {
          console.log(error);
          editFailed();
        }
      )
    }

    onMounted(() => {
      fetchData({});
    });

    return {
      items,
      editedItem,
      editedIndex,
      handleUpdate,
      headers,
      editItem,
    };
  },
});
</script>

<style scoped></style>
