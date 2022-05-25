<template>
    <div class="min-h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">
        <p class="mx-4 mt-5 inline"> {{exp.exp_name}} - {{ exp.questions.length}} Questions. </p>
        Due date: <date-view v-model="exp.due_date"></date-view>

        <span class="material-symbols-outlined cursor-pointer text-lg text-red-600 float-right mr-4 pt-2" @click="$emit('delete')">delete</span>
        <span class="material-symbols-outlined cursor-pointer text-lg text-blue-400 float-right mr-2 pt-2" @click="expEditModal.show = true">edit</span>
        <button class="flex items-center mt-2 ml-5 bg-gray-600 rounded px-2 py-0 text-sm" @click="showAddQuestionModal">
            <span class="material-symbols-outlined cursor-pointer text-lg">add</span> <span> ADD </span> 
        </button>
        
        <ul class="px-6 py-4">
            <li v-for="(question, index) in exp.questions" :key="question.id">
                <span class="cursor-pointer" @click="showEditQuestionModal(index)">{{question.question_number}} ) {{ question.question }} - {{ question.mark}} marks</span> 
                <button style="color: red; font-face:bold;" @click="showQuestionDeleteModal(index)">X</button>
            </li>
        </ul>
    </div>
    <add-edit-question-modal :show="questionModal.show" @cancel="questionModal.show = false" @saved="questionSaved" :id="questionModal.id" :edit="questionModal.edit" pageType="lab"/>
    <modal :show="expEditModal.show" @cancel="expEditModal.show = false" @confirm="editExp">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Edit Experiment</h1>
        </template>
        <template #content>

            <div class="w-full">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="name">Experiment Name: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600 text-black" name="name" type="text" v-model="expEditModal.name"> </div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="marks">Total Marks: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600 text-black" name="marks" type="number" v-model="expEditModal.marks">  </div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="due">Due Date: </label> </div>
                    <div class=""> <input class="rounded bg-gray-600 text-black ml-2" name="due" type="date" v-model="expEditModal.due"> </div>
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
            <h2 class="mt-4 text-gray-400">{{ exp.questions[questionDeleteModal.index].question }}</h2>
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
import { throwStatement } from '@babel/types'

export default({
    name: 'LabExperimentCard',
    data(){
        return {
            exp: {
                questions: []
            },
            questionModal: {
                show: false,
                edit: false,
                id: undefined,
            },
            expEditModal: {
                show: false,
                name: '',
                marks: 0,
                due: '',
            },
            questionDeleteModal: {
                show: false,
                index: undefined,
            }
        }
    },
    props: {
        exp_id: {
            type: Number,
            required: true,
        }
    },
    watch: {
        async exp_id(newVal){
            await this.getExps(newVal)
        }
    },
    methods: {
        async getExps(id){
            const response = await axios.get(`/api/v1/labs/exp/${id}`)
            this.exp = response.data
            this.expEditModal.name = this.exp.exp_name
            this.expEditModal.marks = this.exp.total_marks
            this.expEditModal.due = this.exp.due_date.split('T')[0]
        },
        async editExp(){
            const response = await axios.put(`/api/v1/labs/exp/${this.exp.id}`, {
                exp_name: this.expEditModal.name,
                total_marks: this.expEditModal.marks,
                due_date: this.expEditModal.due
            })
            this.exp = response.data
            this.expEditModal.show = false
        },
        showEditQuestionModal(index){
            this.questionModal.id = this.exp.questions[index].id
            this.questionModal.edit = true
            this.questionModal.show = true
        },
        showAddQuestionModal(){
            this.questionModal.id = this.exp.id
            this.questionModal.edit = false
            this.questionModal.show = true
        },
        showQuestionDeleteModal(index){
            this.questionDeleteModal.index = index
            this.questionDeleteModal.show = true
        },
        questionSaved(){
            this.questionModal.show = false
            this.getExps(this.exp_id)
        },
        async deleteQuestion(){
            const response = axios.delete(`/api/v1/labs/question/${this.exp.questions[this.questionDeleteModal.index].id}`)
            this.exp.questions.splice(this.questionDeleteModal.index, 1)
            this.questionDeleteModal.show = false
        }
    },
    async mounted(){
        await this.getExps(this.exp_id)
    },
    components: {
        AddEditQuestionModal,
        Modal,
        DateView,
    }
})
</script>