<template>
<div class="content">

    <div class="header">
        <p> Exams </p>
    </div>

    <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
        <div v-for="exam in exams" :key="exam.id" class="h-36 border border-borderclr rounded-2xl bg-cardclr cursor-pointer" @click="clickCard(exam.id)">
            <p class="mx-4 mt-5"> {{exam.exam_name}} - {{ exam.questions.length}} Questions. </p>
        </div>
    </div>

</div>
</template>

<script>
import axios from "axios"


export default({
    name: 'ExamClass',
    methods: {
        async getExams(){
            const cid = this.$route.params.cid

            const response = await axios.get(`/api/v1/labexams/${cid}`)
            this.exams = response.data
        },
        clickCard(id){
            this.$router.push(`/exams/exam/${id}`)
        },
    },
    data(){
        return {
            exams: undefined,
        }
    },
    async mounted(){
        await this.getExams()
    }
})
</script>