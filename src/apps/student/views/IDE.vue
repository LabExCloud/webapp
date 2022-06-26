<template>

    <IDEcomponent :exam="false"/>


</template>

<script>

import IDEcomponent from '@/components/IDEcomponent.vue'

export default({
    name: 'IDE',
    components: {
        IDEcomponent,
    },
})

</script>

