<template>
  <div
    :class="
      `fixed z-40 inset-0 overflow-hidden ${!isOpenSlider &&
        'pointer-events-none'}`
    "
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpenSlider"
        class="absolute inset-0 bg-black bg-opacity-25 transition-opacity"
        @click="isOpenSlider = false"
        aria-hidden="true"
      ></div>
    </transition>

    <transition
      enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      leave-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <section
        v-if="isOpenSlider"
        class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
        aria-labelledby="slide-over-heading"
      >
        <div class="relative w-screen max-w-md">
          <!-- Close button -->
          <transition
            enter-active-class="ease-in-out duration-500"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in-out duration-500"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
            >
              <button
                class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                @click="isOpenSlider = false"
              >
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </transition>
          <div
            class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
          >
            <div class="px-4 sm:px-6">
              <h2
                id="slide-over-heading"
                class="text-lg font-medium text-gray-900"
              >
                <slot name="header">
                  Panel title
                </slot>
              </h2>
            </div>
            <div class="mt-6 relative flex-1 px-4 sm:px-6">
              <!-- Replace with your content -->
              <div class="absolute inset-0 px-4 sm:px-6">
                <div class="h-full" aria-hidden="true">
                  <slot name="content">
                    Panel Content
                  </slot>
                </div>
              </div>
              <!-- /End replace -->
            </div>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useOpenState } from "@/components/hooks/useOpenState";

export default defineComponent({
  setup() {
    const { isOpenSlider } = useOpenState();
    return { isOpenSlider };
  },
});
</script>

<style scoped></style>
