<template>
    <div class="content">
        <h1 class="text-xl text-blue-400 text-center mt-7"> Student Analysis </h1>
        <button class="text-center text-base w-36 ml-9 mt-9 text-white bg-gray-700 border border-black rounded-md" @click="showAddClassModal">
            <span @click="addStudentModal.show = true" class="mx-3">+ Add student</span>
        </button>
        <button class="text-center text-base w-36 ml-9 mt-9 text-white bg-gray-700 border border-black rounded-md" @click="showAddClassModal">
            <span @click="addStudentCsvModal.show = true" class="mx-3">+ Add student csv</span>
        </button>
        <div v-for="(student, index) in students" :key="index" class="grid grid-cols-3 gap-y-2 gap-x-5 py-2 px-10 mx-10 my-4 min-h-36 rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-white">
            
            <div>
                {{ index + 1 }}
            </div>
            <div class="">
                {{ student.first_name }} {{ student.last_name }}
            </div>
            <div class="">
                <button>
                    <span class="material-symbols-outlined text-lg">preview</span>
                </button>
                <button @click="showRemoveStudentModal(student)" class="ml-16">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </div>
        
        </div>

        <div>
            <!-- <h1 class="text-xl text-blue-400 text-center mt-7"> Analysis </h1> -->
            <v-chart class="chart" :option="option" />
        </div>
    </div>
    <modal :show="addStudentModal.show" @cancel="addStudentModal.show = false" @confirm="addStudent">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Add student to this class</h1>
        </template>
        <template #content>
            <div class="w-full mt-4">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="search">Search: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input list="students" class="rounded bg-gray-600 text-black" name="search" type="text" v-model="addStudentModal.username" autocomplete="off">
                        <datalist v-if="students" id="students">
                            <option v-for="student in addStudentModal.students" :value="student.username">{{ student.username }} - {{ student.first_name }}</option>
                        </datalist>
                    </div>
                </div>
                        
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Add 
        </template>
    </modal>
    <modal :show="addStudentCsvModal.show" @cancel="addStudentCsvModal.show = false" @confirm="uploadStudentCsv">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Add student to this class</h1>
        </template>
        <template #content>
            <div class="w-full mt-4">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="upload">Upload csv file: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input type="file" accept=".csv" name="upload" @change="setAddStudentFile($event)">
                    </div>
                </div>
                        
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Add 
        </template>
    </modal>
    <modal :show="removeStudentModal.show" @cancel="removeStudentModal.show = false" @confirm="removeStudent">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">You sure you want to remove this student from this class?</h1>
        </template>
        <template #content>
            <div class="w-full mt-4">
                <h2>{{ removeStudentModal.student.first_name }} {{ removeStudentModal.student.last_name }} ({{ removeStudentModal.student.username }}) will be removed from this class</h2>
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Remove
        </template>
    </modal>
</template>

<script>
import { mapGetters } from 'vuex'

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref } from "vue";
import axios from 'axios';

import Modal from '@/components/Modal.vue'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);


export default({
    name: 'Analysis',
    async mounted(){
        document.title = 'Student Analysis'
        await this.getStudents()
        await this.getAllStudents()
    },
    methods: {
        async getStudents(){
            const response = await axios.get(`/api/v1/class/students/${this.classs.id}`)
            this.students = response.data
        },
        async getAllStudents(){
            const response = await axios.get(`/api/v1/students`)
            this.addStudentModal.students = response.data
        },
        async addStudent(){
            const student = this.addStudentModal.students.find(st => st.username === this.addStudentModal.username)
            const response = await axios.post(`/api/v1/class/student/${this.classs.id}/${student.student}`)
            await this.getStudents()
            this.addStudentModal.show = false
        },
        async removeStudent(){
            const response = await axios.delete(`/api/v1/class/student/${this.classs.id}/${this.removeStudentModal.student.student}`)
            await this.getStudents()
            this.removeStudentModal.show = false
        },
        showRemoveStudentModal(student){
            this.removeStudentModal.student = student
            console.log(student);
            this.removeStudentModal.show = true
        },
        setAddStudentFile(event){
            this.addStudentCsvModal.file = event.target.files[0]
        },
        async uploadStudentCsv(){
            let data = new FormData()
            data.append('file', this.addStudentCsvModal.file)
            const response = await axios.post(
                `/api/v1/class/student/${this.classs.id}`, 
                data,
                {
                    headers: {"Content-Type": "multipart/form-data",},
                }
            )
            if (response.status == 200){
                this.addStudentCsvModal.show = false
                this.getStudents()
            }else{
                //show the error in response.data
            }
        }
    },
    data() {
        return {
            students: [],
            addStudentModal: {
                show: false,
                students: [],
                username: '',
            },
            addStudentCsvModal: {
                show: false,
                file: undefined,
            },
            removeStudentModal: {
                show: false,
                student: undefined,
            }
        }
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    },
    watch:{
        'addStudentModal.show': async function(){
            await this.getAllStudents()
        },
    },
    components: {
        VChart,
        Modal,
    },
    provide: {
        [THEME_KEY]: "dark"
    },
    setup() {
        const option = ref({
        title: {
            text: "Analysis - Score",
            left: "center"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            left: "left",
            data: ["Above 90%", "Above 80%", "Above 75%", "Above 50%", "Above 25%"]
        },
        series: [
            {
            name: "Analysis - Score",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
                { value: 14, name: "Above 90%" },
                { value: 42, name: "Above 80%" },
                { value: 31, name: "Above 75%" },
                { value: 19, name: "Above 50%" },
                { value: 3, name: "Above 25%" }
            ],
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
            }
        ]
        });
        return { option };
    }
    
})
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>

<style>
body {
  margin: 0;
}
</style>
