<template>
    <div class="content" v-if="showInfo">
        <ExamInfo @start="start"/>
    </div>
    <div class="content" v-if="showQuestions">
        <ExamQuestionList :exam="exam" @qid="doQuestion" @end="exit()"/>
    </div>
    <IDEcomponent v-if="showIDE" :exam="true" @submit="submit" :qnid="qid"/>

    <proctoring v-if="enableProctoring" @predictions="predictions" @access="access"/>
</template>

<script>
import IDEcomponent from "@/components/IDEcomponent.vue"
import ExamInfo from "@/components/ExamInfo.vue"
import ExamQuestionList from "../../components/ExamQuestionList.vue"
import Proctoring from '@/components/Proctoring.vue'
import axios from "axios"

export default({
    name: 'Exam',
    data(){
        return {
            exam: {
                questions: []
            },
            enableProctoring: false,
            showInfo: true,
            showQuestions: false,
            showIDE: false,
            qid: 5
        }
    },
    methods: {
        async getExam(id){
            const response = await axios.get(`/api/v1/labexams/exam/${id}`)
            this.exam = response.data
        },
        access(){
            document.documentElement.requestFullscreen()
            addEventListener('fullscreenchange', event => {
                if(!document.fullscreenElement){
                    // message exit fullscreen
                }
            })
            this.showInfo = false
            this.showQuestions = true
        },
        start(){
            this.enableProctoring = true
        },
        doQuestion(qid){
            this.qid = qid
            this.showQuestions = false
            this.showIDE = true
        },
        submit(){
            this.showIDE = false
            this.showQuestions = true
        },
        predictions(event){
            console.log(event);
        },
        exit(){
            document.exitFullscreen()
            this.enableProctoring = false
            this.$router.go(-1)
        }
    },
    async mounted(){
        await this.getExam(this.$route.params.eid)
    },
    components: {
        ExamInfo,
        IDEcomponent,
        ExamQuestionList,
        Proctoring,
    }
})
</script>