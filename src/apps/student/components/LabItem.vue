<template>
    <div class="lab-item">
        <div>
            <img :src="lab.subject.image" alt="subject image">
            <div>
                <p class="title">{{ lab.subject.sub_code }} - {{ lab.subject.sub_name }}</p>
                <p class="name">{{ lab.owner.first_name + " " + lab.owner.last_name }}</p>
            </div>
        </div>

        <div class="w-full px-4">
            <div class="bg-gray-200 h-1.5 rounded">
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
    }
})
</script>

<style>
.lab-item {
    @apply h-36 border border-borderclr rounded-2xl bg-cardclr;
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