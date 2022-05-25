<template>
    <div class="min-h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">
        <p class="mx-4 mt-5 inline"> {{exam.exam_name}} - {{ exam.questions.length}} Questions. </p>
        Start Date: <date-view v-model="exam.start_date"></date-view>
        Due date: <date-view v-model="exam.due_date"></date-view>

        <span class="material-symbols-outlined cursor-pointer text-lg text-red-600 float-right mr-4 pt-2" @click="$emit('delete')">delete</span>
        <span class="material-symbols-outlined cursor-pointer text-lg text-blue-400 float-right mr-2 pt-2" @click="examEditModal.show = true">edit</span>
        <button class="flex items-center mt-2 ml-5 bg-gray-600 rounded px-2 py-0 text-sm" @click="showAddQuestionModal">
            <span class="material-symbols-outlined cursor-pointer text-lg">add</span> <span> ADD </span> 
        </button>
        
        <ul class="px-6 py-4">
            <li v-for="(question, index) in exam.questions" :key="question.id">
                <span class="cursor-pointer" @click="showEditQuestionModal(index)">{{question.question_number}} ) {{ question.question }} - {{ question.mark}} marks</span> 
                <button style="color: red; font-face:bold;" @click="showQuestionDeleteModal(index)">X</button>
            </li>
        </ul>
    </div>
    <add-edit-question-modal :show="questionModal.show" @cancel="questionModal.show = false" @saved="questionSaved" :id="questionModal.id" :edit="questionModal.edit" pageType="exam"/>
    <modal :show="examEditModal.show" @cancel="examEditModal.show = false" @confirm="editExam">
        <template #header>
            <h1>Edit Exam</h1>
        </template>
        <template #content>

            <div class="w-full">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="name">Exam Name: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600 text-black" name="name" type="text" v-model="examEditModal.name"> </div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="marks">Total Marks: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600 text-black" name="marks" type="number" v-model="examEditModal.marks">  </div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"><label for="start">Start: </label></div>
                    <div class="md:w-2/3"><input class="rounded bg-gray-600 text-black" name="start" type="date" v-model="examEditModal.start"></div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="due">Due Date: </label> </div>
                    <div class=""> <input class="rounded bg-gray-600 text-black ml-2" name="due" type="date" v-model="examEditModal.due"> </div>
                </div>
            </div>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Save
        </template>
    </modal>
    <modal :show="questionDeleteModal.show" @cancel="questionDeleteModal.show = false" @confirm="deleteQuestion()">
        <template #header>
            <h1>You sure you want to delete this question?</h1>
        </template>
        <template #content>
            <h2 class="mt-4 text-gray-400">{{ exam.questions[questionDeleteModal.index].question }}</h2>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Delete
        </template>
    </modal>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'
import AddEditQuestionModal from './AddEditQuestionModal.vue'
import DateView from '@/components/DateView.vue'

export default({
    name: 'LabExamCard',
    data(){
        return {
            exam: {
                questions: []
            },
            questionModal: {
                show: false,
                edit: false,
                id: undefined,
            },
            examEditModal: {
                show: false,
                name: '',
                marks: 0,
                due: '',
                start: '',
            },
            questionDeleteModal: {
                show: false,
                index: undefined,
            }
        }
    },
    props: {
        exam_id: {
            type: Number,
            required: true,
        }
    },
    watch: {
        async exam_id(newVal){
            await this.getExams(newVal)
        }
    },
    methods: {
        async getExams(id){
            const response = await axios.get(`/api/v1/labexams/exam/${id}`)
            this.exam = response.data
            this.examEditModal.name = this.exam.exam_name
            this.examEditModal.marks = this.exam.total_marks
            this.examEditModal.due = this.exam.due_date.split('T')[0]
            this.examEditModal.start = this.exam.start_date.split('T')[0]
        },
        async editExam(){
            const response = await axios.put(`/api/v1/labexams/exam/${this.exam.id}`, {
                exam_name: this.examEditModal.name,
                total_marks: this.examEditModal.marks,
                start_date: this.examEditModal.start,
                due_date: this.examEditModal.due
            })
            this.exam = response.data
            this.examEditModal.show = false
        },
        showEditQuestionModal(index){
            this.questionModal.id = this.exam.questions[index].id
            this.questionModal.edit = true
            this.questionModal.show = true
        },
        showAddQuestionModal(){
            this.questionModal.id = this.exam.id
            this.questionModal.edit = false
            this.questionModal.show = true
        },
        showQuestionDeleteModal(index){
            this.questionDeleteModal.index = index
            this.questionDeleteModal.show = true
        },
        questionSaved(){
            this.questionModal.show = false
            this.getExams(this.exam_id)
        },
        async deleteQuestion(){
            const response = axios.delete(`/api/v1/labexams/question/${this.exam.questions[this.questionDeleteModal.index].id}`)
            this.exam.questions.splice(this.questionDeleteModal.index, 1)
            this.questionDeleteModal.show = false
        }
    },
    async mounted(){
        await this.getExams(this.exam_id)
    },
    components: {
        AddEditQuestionModal,
        Modal,
        DateView,
    }
})
</script>