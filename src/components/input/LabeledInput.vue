<template>
  <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="mt-1 focus:shadow-outline block w-full sm:text-sm border border-gray-300 rounded-md"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>