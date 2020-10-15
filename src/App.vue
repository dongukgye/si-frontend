<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const layout = ref("default-layout");
    return {
      layout,
    };
  },
});
</script>
