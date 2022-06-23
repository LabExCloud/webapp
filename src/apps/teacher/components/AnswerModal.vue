<template>
    <div v-if="show" class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="min-w-[40rem] min-h-[35rem] bg-cardclr text-white border border-borderclr px-16 py-14 rounded-2xl">
            <slot name="header">header</slot>
            <slot name="content">content</slot><br>

            <div class="text-center">
                <button class="bg-green-500 px-4 py-2 rounded-md text-md text-white mt-2 mb-1" @click="$emit('close')"><slot name="close"></slot></button>
            </div>
            
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