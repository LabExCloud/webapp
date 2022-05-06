<template>
    <div class="lab-item cursor-pointer" @click="clickCard(lab.id)">
        <div class="flex  ml-4 mt-4">
            <img :src="lab.subject.image" alt="subject image" class="h-24 w-24 rounded-2xl">
            <div class="w-full flex flex-col px-6">
                <p class="title">{{ lab.subject.sub_code }} - {{ lab.subject.sub_name }}</p>
                <p class="name text-gray-400"> - {{ lab.owner.first_name + " " + lab.owner.last_name }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>

        <div class="w-full px-4 py-5">
            <div class="bg-gray-400 h-1.5 rounded">
                <div class="bg-blue-600 h-1.5 rounded" style="width: 45%"></div>
            </div>
            <div class="flow-root">
                <div class="float-left">50%</div>
                <div class="float-right">5/10</div>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    name: 'LabItem',
    props: {
        lab: {}
    },
    methods: {
        clickCard(id){
            this.$router.push(`/labs/lab/${id}`)
        }
    }
})
</script>

<style>
.lab-item {
    @apply h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl;
}

.lab-item img{
    width: 50px;
    height: 50px;
    float: left;
}

.lab-item .progress .percent{
    float: left;
}

.lab-item .progress .number{
    float: right;
}
</style>