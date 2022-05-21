<template>
    <div v-if="show" class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="bg-cardclr border border-borderclr px-16 py-14 rounded-2xl text-center">
            <slot name="content">content</slot><br>
            <button class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white" @click="$emit('cancel')"><slot name="cancel"></slot></button>
            <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="$emit('confirm')"><slot name="confirm"></slot></button>
        </div>
    </div>
</template>

<script>
export default({
    name: 'Modal',
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