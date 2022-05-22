<template>
    <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">
        <p class="mx-4 mt-5"> {{exp.exp_name}} - {{ exp.questions.length}} Questions. </p>
            <span class="material-symbols-outlined cursor-pointer" @click="editExp">edit</span>
            <span class="material-symbols-outlined cursor-pointer" @click="$emit('delete')">delete</span>
            <span class="material-symbols-outlined cursor-pointer" @click="questionModal.show = true">add</span>
        <ul class="px-6 py-4">
            <li v-for="(question, index) in exp.questions" :key="question.id">
                {{question.id}} ) {{ question.question }} - {{ question.mark}} marks <button style="color: red; font-face:bold;" @click="showQuestionDeleteModal(index)">X</button>
            </li>
        </ul>
    </div>
    <add-edit-question-modal :show="questionModal.show" @cancel="questionModal.show = false"/>
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
        editExp(){}
    },
    async mounted(){
        await this.getExps(this.exp_id)
    },
    components: {
        AddEditQuestionModal,
    }
})
</script>