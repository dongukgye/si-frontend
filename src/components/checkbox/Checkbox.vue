<template>
    <input 
        type="checkbox" 
        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300 rounded"
        :checked="checked"
        @change="$emit('update:modelValue', $event.target.checked)"
    />


</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
    props: ['modelValue', 'itemId'],
    emits: ['update:modelValue'],
    setup (props) {
        const checked = computed({
            get: () => {
                if (props.modelValue instanceof Boolean) {
                    return props.modelValue
                } else {
                    return props.modelValue.indexOf(props.itemId) > -1
                }
            },
            set: () => {}
        })
        return {
            checked
        }
    }
})
</script>

<style scoped>

</style>