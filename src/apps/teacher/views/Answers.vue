<template>
<div class="content">
    <div class="header">
        <p>Answers</p>
    </div>

<<<<<<< HEAD
    <div class="grid grid-cols-6 gap-y-2 gap-x-2 py-5 px-4 min-h-36 text-white text-lg">
            <span> Qn: </span>
            <span> Name </span>
            <span> Answers </span>
            <span> Submitted date </span>
            <span> Modified date </span>
            <span> Total Marks </span>
        </div>

    <div v-for="(answer, index) in answers" class="grid grid-cols-1 gap-1 py-2 px-2 text-white">
        <div class="grid grid-cols-6 gap-y-2 gap-x-2 py-5 px-4 min-h-36  rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">
            <span> {{ answer.question }}</span>
            <span> {{ answer.student.first_name }} {{ answer.student.last_name }}</span>
            <button class="bg-gray-600 rounded" > <a :href="answer.answer"> View answer </a> </button>
            <span> <date-view v-model="answer.submitted"></date-view> </span>
            <span> <date-view v-model="answer.modified"></date-view> </span>
            <span> {{ answer.total_marks }} </span>
        </div>
=======
    <div v-for="(answer, index) in answers">
        <div>{{ answer.answer }}</div>
        <div><date-view v-model="answer.submitted" /></div>
        <div><date-view v-model="answer.modified"></date-view></div>
        <div>{{ answer.total_marks }}</div>
        <div>{{ answer.student.username }}</div>
        <div>{{ answer.student.firstname }}</div>
>>>>>>> 380ed0e67850cf9ab136ed8eadbebb938cf358bd
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
        await this.getAnswers(this.$route.params.ansid);
        
    },
    methods: {
        async getAnswers(id){
            const response = await axios.get(`/api/v1/labs/answers/${id}`)
            this.answers = response.data
            this.updateAnswer();
        },
        updateAnswer(){
            for(let eachAns in this.answers){
                this.answers[eachAns].answer = axios.defaults.baseURL + this.answers[eachAns].answer;
            }
                //console.log(this.answers)
        }
    },
    components:{
        DateView,
    }
})
</script>