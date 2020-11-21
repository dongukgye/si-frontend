<template>
  <div class="flex h-screen font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/layouts/sidebar/Sidebar.vue";
import Header from "@/layouts/header/Header.vue";
export default defineComponent({
  components: {
    Header,
    Sidebar,
  },
});
</script>
