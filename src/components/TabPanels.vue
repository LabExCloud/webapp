<template>
    <div class="ml-4 py-4 rounded-bl-md rounded-br-md overflow-hidden">
        <slot />
    </div>
</template>

<script>
import { ref, provide, computed } from "vue";

export default {
    name: "TabPanels",
    props: {
        modelValue: [String, Number],
    },
    setup(props) {
        provide("tabsPanelState", {
            active: computed(() => props.modelValue),
            panels: ref([]),
        });
    },
};
</script>