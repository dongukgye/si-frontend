<template>
  <button
    :class="`px-4 py-2 text-sm rounded-2xl focus:outline-none ${bgColor} transition duration-200`"
    v-bind="$attrs"
  >
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "",
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const color = computed(() => {
      switch (props.type) {
        case "danger":
          return "red";
        case "success":
          return "green";
        default:
          return "indigo";
      }
    });
    const bgColor = computed(() => {
      return props.text
        ? `font-normal text-${color.value}-600 hover:text-${color.value}-800`
        : `text-white bg-${color.value}-600 hover:bg-${color.value}-800 shadow-lg focus:shadow-outline`;
    });
    return {
      bgColor,
    };
  },
});
</script>

<style scoped>
</style>