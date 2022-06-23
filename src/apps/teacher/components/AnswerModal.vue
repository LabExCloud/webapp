<template>
    <div v-if="show" class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="bg-cardclr text-white border border-borderclr px-16 py-14 rounded-2xl text-center">
            <slot name="header">header</slot>
            <slot name="content">content</slot><br>
        </div>
    </div>
</template>

<script>
export default({
    name: 'AnswerModal',
    data(){
        return {
        }
    },
    props: {
        show: Boolean,
    },
    methods: {
    },
    async mounted(){
    }
})
</script>