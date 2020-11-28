<template>
  <div>
    <div class="flex items-center justify-between px-2">
      <div>
        <Title title="Part List" />
      </div>
      <div>
        <Button @click="editItem(defaultItem)">
          <svg
            class="h-5 w-5 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          부품
        </Button>
      </div>
    </div>
    <div class="h-auto shadow-2xs overflow-x-auto rounded-lg relative">
      <DataTable :headers="headers" :data="items" selectable>
        <template v-slot:col_quantity="{ item }">
          <div class="flex items-center">
            <div class="w-2 h-2 mx-2 bg-blue-300 rounded-full"></div>
            {{ item.quantity }}
          </div>
        </template>

        <template v-slot:col_action="{ item }">
          <Button @click="editItem(item)" text> 수정 </Button>
        </template>
      </DataTable>
    </div>
    <Slider>
      <template v-slot:header> This is custom header </template>

      <template v-slot:content>
        <div
          v-for="(header, i) in editHeaders"
          :key="i"
          class="col-span-6 sm:col-span-4 my-2"
        >
          <label
            for="email_address"
            class="block text-sm font-medium text-gray-700"
            >{{ header.text }}</label
          >
          <input
            v-model="editedItem[header.value]"
            type="text"
            id="email_address"
            class="mt-1 focus:shadow-outline block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div class="flex items-center justify-between px-2">
          <div v-show="editedIndex > -1" class="flex-1">
            <Button type="danger" text> 삭제 </Button>
          </div>
          <div class="flex-1 text-right">
            <Button @click="handleUpdate"> {{ saveButtonLabel }} </Button>
          </div>
        </div>
      </template>
    </Slider>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";
import PartService from "@/services/partService";
import Title from "@/components/base/Title.vue";
import DataTable from "@/components/table/DataTable.vue";
import Slider from "@/components/slider/Slider.vue";
import { useItems } from "@/components/hooks/useItems";
import { usePagination } from "@/components/hooks/usePagination";
import { IInventoryPart } from "@/types/inventory";
import partService from "@/services/partService";
import Button from "@/components/button/Button.vue";

export default defineComponent({
  components: {
    Button,
    DataTable,
    Slider,
    Title,
  },
  setup() {
    const { totalCount } = usePagination();
    const {
      items,
      editedItem,
      editedIndex,
      editItem,
      createSuccess,
      createFailed,
      editSuccess,
      editFailed,
    } = useItems();
    const defaultItem = {
      name: "",
      spec: "",
      serial: "",
      desc: "",
      category: 1,
      quantity: 0,
      ideal_quantity: 0,
      order_quantity: 0,
    };
    const headers = ref([
      { text: "Name", value: "name" },
      { text: "Description", value: "desc" },
      { text: "Spec", value: "spec" },
      { text: "Serial", value: "serial" },
      { text: "Quantity", value: "quantity" },
      { text: "Ideal quantity", value: "ideal_quantity" },
      { text: "Order quantity", value: "order_quantity" },
      { text: "", value: "action" },
    ]);

    const editHeaders = computed(() => {
      return headers.value.filter((header) => {
        return header.value !== "action";
      });
    });

    const saveButtonLabel = computed(() => {
      return editedIndex.value > -1 ? "수정" : "추가";
    });

    function fetchData(params: any) {
      PartService.getParts(params).then(
        (data: IInventoryPart) => {
          items.value = data;
          totalCount.value = items.value.length;
        },
        (err) => {
          console.log(err);
        }
      );
    }

    function handleUpdate() {
      if (editedIndex.value === -1) {
        const data = editedItem.value as IInventoryPart;
        partService.createPart(data).then(
          (data) => {
            createSuccess(data);
          },
          (error) => {
            createFailed();
          }
        );
      } else {
        PartService.updatePart(editedItem.value).then(
          (data) => {
            editSuccess(data);
          },
          (error) => {
            console.log(error);
            editFailed();
          }
        );
      }
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
      editHeaders,
      editItem,
      defaultItem,
      saveButtonLabel,
    };
  },
});
</script>

<style scoped></style>
