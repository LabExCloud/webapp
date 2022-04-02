<template>
    <div class="lab-item">
        <div>
            <img src="https://www.freepngimg.com/download/android/72537-icons-python-programming-computer-social-tutorial.png" alt="python">
            <div>
                <p class="title">Python</p>
                <p class="name">name</p>
            </div>
        </div>

        <div class="progress">
            <span class="percent">68%</span>
            <div class="w3-light-grey w3-round-xlarge">
                <div class="w3-container w3-blue w3-round-xlarge" style="height:10px;width:68%"></div>
            </div>
            <span class="number">17/25</span>
        </div>
    </div>
</template>

<script>
export default({
    name: 'LabItem',
    props: {
        item: {}
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