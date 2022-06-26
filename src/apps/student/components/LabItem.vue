<template>
    <div class="lab-item cursor-pointer" @click="clickCard(lab.id)">
        <div class="flex  ml-4 mt-4">
            <img :src="lab.subject.image" alt="subject image" class="h-24 w-24 rounded-2xl">
            <div class="w-full flex flex-col px-6">
                <p class="title">{{ lab.subject.sub_code }} - {{ lab.subject.sub_name }}</p>
                <p class="name text-gray-400"> - {{ lab.owner.first_name + " " + lab.owner.last_name }}</p>
            </div>
        </div>

        <!-- <div class="w-full px-4 py-5">
            <div class="bg-gray-400 h-1.5 rounded">
                <div class="bg-blue-600 h-1.5 rounded" style="width: 45%"></div>
            </div>
            <div class="flow-root">
                <div class="float-left">50%</div>
                <div class="float-right">5/10</div>
            </div>
        </div> -->
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