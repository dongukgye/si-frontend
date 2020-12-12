<template>
  <div class="relative inline-block">
    <div>
      <button
        type="button"
        class="inline-flex justify-center text-right w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="options-menu"
        @click="openDropdown = !openDropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {{ label }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="openDropdown"
        class="origin-top-right absolute left-0 mt-2 w-32 rounded-md shadow-2xs bg-white ring-1 ring-black ring-opacity-5"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            v-for="(item, i) in selectItems"
            :key="i"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            @click="selectItem(item)"
            >{{ item }}</a
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    items: {
      type: Array,
      default: Array,
    },
    itemValue: {
      type: String,
      defaullt: "",
    },
    itemText: {
      type: String,
      defaullt: "",
    },
  },
  setup(props, context) {
    const isObject = ref(false);
    const openDropdown = ref(false);

    const label = computed(() => {
      const item: any = props.items.find(
        (item: any) => item[props.itemValue as string] === props.modelValue
      );
      return item !== undefined ? item.name : "Select Something";
    });

    const selectItems = computed(() => {
      if (props.items.length > 0 && props.items[0] instanceof Object) {
        isObject.value = true;
        return props.items.map((item: any) => item[props.itemText as string]);
      }
      return props.items;
    });

    function selectItem(item: any) {
      openDropdown.value = false;
      let value = item;
      if (isObject.value) {
        const obj: any = props.items.find(
          (x: any) => x[props.itemText as string] === item
        );
        value = obj[props.itemValue as string];
      }
      context.emit("update:modelValue", value);
    }

    return {
      label,
      openDropdown,
      selectItem,
      selectItems,
    };
  },
});
</script>

<style scoped></style>
