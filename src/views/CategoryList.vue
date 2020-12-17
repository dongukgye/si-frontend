<template>
  <div>
    <Title title="Category List" />
    <DataTable :headers="headers" :data="items" selectable>
      <template v-slot:col_category_status="{ item }">
        <div class="flex items-center">
          <div class="w-2 h-2 mx-2 bg-blue-300 rounded-full"></div>
          {{ item.category_status }}
        </div>
      </template>
      <template v-slot:col_action="{ item }">
        <div class="flex items-center">
          <Button @click="startEditItem(item, editFunction)" text>
            <icon :d="icons.pencilAlt" class="h-4 w-4" />
          </Button>

          <Button
            @click="startDeleteItem(item, deleteFunction)"
            text
            type="danger"
          >
            <icon :d="icons.trash" class="h-4 w-4" />
          </Button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Button from "@/components/button/Button.vue";
import DataTable from "@/components/table/DataTable.vue";
import Icon from "@/components/icon/Icon.vue";
import Title from "@/components/base/Title.vue";

import categoryService from "@/services/categoryService";

import { ICategory } from "@/types/inventory";
import { useItemCrud } from "@/components/hooks/useItemCrud";
import { usePagination } from "@/components/hooks/usePagination";

export default defineComponent({
  components: {
    Button,
    DataTable,
    Icon,
    Title,
  },
  setup() {
    const icons = require("@/assets/icons.json");
    const { totalCount } = usePagination();
    const deleteFunction = ref(categoryService.deleteCategory);
    const createFunction = ref(categoryService.deleteCategory);
    const editFunction = ref(categoryService.deleteCategory);
    const {
      editedIndex,
      editedItem,
      items,
      processEditItem,
      processDeleteItem,
      startEditItem,
      startDeleteItem,
    } = useItemCrud();
    const headers = ref([
      { text: "Category", value: "name" },
      { text: "Part Count", value: "parts_count", editable: true },
      { text: "Status", value: "category_status" },
      { text: "Action", value: "action" },
    ]);
    const data = ref([
      { category: "Nut", count: 128, status: "OK" },
      { category: "Bolt", count: 310, status: "Lack" },
      { category: "Washaer", count: 28, status: "OK" },
    ]);

    function fetchData(params: any) {
      categoryService.getCategories(params).then(
        (data: ICategory) => {
          items.value = data;
          totalCount.value = items.value.length;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }

    onMounted(() => {
      fetchData({});
      // fetchCategories();
    });

    return {
      deleteFunction,
      createFunction,
      editFunction,
      headers,
      editedIndex,
      editedItem,
      icons,
      items,
      processEditItem,
      processDeleteItem,
      startEditItem,
      startDeleteItem,
    };
  },
});
</script>

<style scoped></style>
