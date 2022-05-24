<template>

    <div class="content">
        <div class="header">
            <p> Lab Exams </p>
        </div>
        
        <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Exams"/>
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md" @click="examAddModal.show = true">
                    <span class="mx-4">+ New Exam</span>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <lab-exam-card v-for="(exam, index) in exams" :key="exam.id" :exam_id="exam.id" @delete="showDeleteExamModal(index)"/>
        </div>
    </div>

    <modal :show="examDeleteModal.show" @cancel="examDeleteModal.show = false" @confirm="deleteExam">
        <template #header>
            <h1>You sure you want to delete this Exam?</h1>
        </template>
        <template #content>
            <h2>{{ exams[this.examDeleteModal.index].exam_name }}</h2>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Delete
        </template>
    </modal>
    <modal :show="examAddModal.show" @cancel="examAddModal.show = false" @confirm="addExam">
        <template #header>
            <h1>Add new Exam</h1>
        </template>
        <template #content>

            <div class="w-full">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="name">Exam Name: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600" name="name" type="text" v-model="examAddModal.name"> </div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="marks">Total Marks: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600" name="marks" type="number" v-model="examAddModal.marks">  </div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"><label for="start">Start: </label></div>
                    <div class="md:w-2/3"><input class="rounded bg-gray-600" name="start" type="date" v-model="examAddModal.start"></div>
                </div>

                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3"> <label for="due">Due Date: </label> </div>
                    <div class="md:w-2/3"> <input class="rounded bg-gray-600" name="due" type="date" v-model="examAddModal.due"> </div>
                </div>
            </div>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Create
        </template>
    </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import Modal from '@/components/Modal.vue'
import LabExamCard from '../../components/LabExamCard.vue'

export default({
    name: 'Exam',
    mounted(){
        document.title = 'Exam'
        this.getExams()
    },
    components: {
        Modal,
        LabExamCard,
    },
    data(){
        return{
            exams: [],
            examAddModal: {
                name: '',
                marks: 0,
                due: undefined,
                start: undefined,
                show: false,
            },
            examDeleteModal: {
                show: false
            }
        }
    },
    methods: {
        async getExams(){
            var url = `/api/v1/labexams/${this.class_id}`;

            const response = await axios.get(url);
            this.exams = response.data;
        },
        async addExam(){
            const response = await axios.post(`/api/v1/labexams/exam/${this.class_id}`, {
                exam_name: this.examAddModal.name,
                total_marks: this.examAddModal.marks,
                start_date: this.examAddModal.start,
                due_date: this.examAddModal.due
            })
            this.exams.push(response.data)
            this.examAddModal.show = false
        },
        showDeleteExamModal(index){
            this.examDeleteModal.index = index
            this.examDeleteModal.show = true
        },
        async deleteExam(){
            const response = await axios.delete(`/api/v1/labexams/exam/${this.exams[this.examDeleteModal.index].id}`)
            this.exams.splice(this.examDeleteModal.index, 1)
            this.examDeleteModal.show = false
        }
    },
    computed: {
        ...mapGetters([
            'class_id',
        ]),
    }
})
</script>
