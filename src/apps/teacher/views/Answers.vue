<template>
<div class="content">

    <AnswerModal :show="AnsModal.show" @close="AnsModal.show = false">
        <template #header>
            <h1 class="text-xl text-gray-400  text-center">Answer</h1>
        </template>
        <template #content>
           <div class="w-[32rem] h-96 bg-gray-800 overflow-auto rounded mt-6 p-8">
                <p> {{ AnsModal.answer }} </p>
            </div>
        </template>
        
        <template #dl>
                <a :href="AnsModal.CurrentAnsUrl"> Download </a>
        </template>

        <template #close>
                Close
        </template>

    </AnswerModal>

    <div class="header">
        <p>Answers</p>
    </div>

    <button @click="getAnswers($route.params.ansid)" class="bg-gray-600 px-4 py-2 rounded m-5"><span class="material-symbols-outlined text-xl">refresh</span></button>

    <div v-if="answers.length > 0" class="grid grid-cols-6 gap-y-2 gap-x-2 py-5 px-4 min-h-36 text-white text-lg">
            <span> Qn: </span>
            <span> Name </span>
            <span> Answers </span>
            <span> Submitted date </span>
            <span> Modified date </span>
            <span> Total Marks </span>
    </div>
    <div v-else class="text-white text-xl text-center"> Nothing to show ! </div>

    <div v-for="(answer, index) in answers" class="grid grid-cols-1 gap-1 py-2 px-2 text-white">
        <div class="grid grid-cols-6 gap-y-2 gap-x-2 py-5 px-4 min-h-36  rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">
            <span> {{ answer.question }}</span>
            <span> {{ answer.student.first_name }} {{ answer.student.last_name }}</span>
            <button class="bg-gray-600 rounded" @click="showAnswerModal(answer.answer)"> View </button>
            <span> <date-view v-model="answer.submitted"></date-view> </span>
            <span> <date-view v-model="answer.modified"></date-view> </span>
            <span> {{ answer.total_marks }} </span>
        </div>
    </div>

</div>
</template>

<script>
import axios from "axios"
import DateView from "@/components/DateView.vue"
import AnswerModal from "../components/AnswerModal.vue"

export default({
    name: 'Answers',
    data(){
        return {
            answers: [],
            AnsModal: {
                CurrentAnsUrl: "",
                show: false,
                answer: '',
            },
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

        },
        async showAnswerModal(Ansurl){
            this.AnsModal.show = true
            this.AnsModal.CurrentAnsUrl = Ansurl
            try {
                const response = await fetch(Ansurl)
                this.AnsModal.answer = await response.text()
            }catch(e){
                console.log(e)
            }
        },
    },
    components:{
        DateView,
        AnswerModal
    }
})
</script>