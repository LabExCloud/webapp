<template>
    <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">
        <p class="mx-4 mt-5 inline"> {{exp.exp_name}} - {{ exp.questions.length}} Questions. </p>

        <span class="material-symbols-outlined cursor-pointer text-lg text-red-600 float-right mr-4 pt-2" @click="$emit('delete')">delete</span>
        <span class="material-symbols-outlined cursor-pointer text-lg text-blue-400 float-right mr-2 pt-2" @click="editExp">edit</span>
        <button class="flex items-center mt-2 ml-5 bg-gray-600 rounded px-2 py-0 text-sm" @click="questionModal.show = true">
            <span class="material-symbols-outlined cursor-pointer text-lg">add</span> <span> ADD </span> 
        </button>
        
        <ul class="px-6 py-4">
            <li v-for="(question, index) in exp.questions" :key="question.id">
                {{question.id}} ) {{ question.question }} - {{ question.mark}} marks <button style="color: red; font-face:bold;" @click="showQuestionDeleteModal(index)">X</button>
            </li>
        </ul>
    </div>
    <add-edit-question-modal :show="questionModal.show" @cancel="questionModal.show = false" :id="questionModal.id" :edit="questionModal.edit" apiUrl="/api/v1/labs"/>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'
import AddEditQuestionModal from './AddEditQuestionModal.vue'

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
        },
        editExp(){},
        showEditQuestionModal(index){
            this.questionModal.id = this.exp.questions[index].id
            this.questionModal.edit = true
            this.questionModal.show = true
        },
        showAddQuestionModal(){
            this.questionModal.id = undefined
            this.questionModal.edit = false
            this.questionModal.show = true
        }
    },
    async mounted(){
        await this.getExps(this.exp_id)
    },
    components: {
        AddEditQuestionModal,
    }
})
</script>