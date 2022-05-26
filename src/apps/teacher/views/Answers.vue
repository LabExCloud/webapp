<template>
<div class="content">
    <div class="header">
        <p>Answers</p>
    </div>

    <div v-for="(answer, index) in answers">
        <div>{{ answer.answer }}</div>
        <div><date-view v-model="answer.submitted" /></div>
        <div><date-view v-model="answer.modified"></date-view></div>
        <div>{{ answer.total_marks }}</div>
        <div>{{ answer.student.username }}</div>
        <div>{{ answer.student.firstname }}</div>
    </div>
</div>
</template>

<script>
import axios from "axios"
import DateView from "@/components/DateView.vue"

export default({
    name: 'Answers',
    data(){
        return {
            answers: [],
        }
    },
    async mounted() {
        await this.getAnswers(this.$route.params.ansid)
    },
    methods: {
        async getAnswers(id){
            const response = await axios.get(`/api/v1/labs/answers/${id}`)
            this.answers = response.data
        }
    },
    components:{
        DateView,
    }
})
</script>