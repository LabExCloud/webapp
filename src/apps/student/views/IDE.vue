<template>

    <IDEcomponent :exam="false" @submit="submit" :qnid="$route.params.expid"/>


</template>

<script>

import IDEcomponent from '@/components/IDEcomponent.vue'

export default({
    name: 'IDE',
    components: {
        IDEcomponent,
    },
    methods:{
        submit(){
            this.$router.go(-1)
        }
    }
})

</script>

