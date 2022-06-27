<template>
    <div v-if="noti.show" class="text-white px-6 py-4 border-0 rounded absolute top-10 right-3 z-10 bg-red-500">
        <span class="text-2xl inline-block mr-2 align-middle">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
        </span>
        <span class="inline-block align-middle mr-8">
            <b>{{ noti.title }}</b> - {{ noti.message }}
        </span>
        <button class="absolute bg-transparent text-lg leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" v-on:click="noti.show = false">
            <span class="material-symbols-outlined text-gray-600">cancel</span>
        </button>
    </div>

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
            qid: 5,
            noti: {
                show: false,
                message: '',
                title: ''
            }
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
            var people = 0
            event.forEach(e => {
                if(e.class === "person"){
                    people++
                }
            })

            if(people > 1){
                this.noti.message = "Someone else in room"
                this.noti.title = "Error"
                this.noti.show = true
            }
            else if(people == 0){
                this.noti.message = "Cannot see you"
                this.noti.title = "Error"
                this.noti.show = true
            }else if(event.length == 1){
                this.noti.message = ''
                this.noti.show = false
            }else{
                this.noti.message = "Something else is in room"
                this.noti.title = "Error"
                this.noti.show = true
            }
            
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