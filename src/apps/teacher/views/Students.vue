<template>

    <div class="content">
        <div class="header">
            <p> Students </p>
        </div>

        <button class="text-center text-base w-36 ml-9 mt-9 text-white bg-gray-700 border border-black rounded-md" @click="showAddClassModal">
            <span @click="addStudentCsvModal.show = true" class="mx-3">+ Add student CSV</span>
        </button>

        <div v-for="(student, index) in students" :key="index" class="grid grid-cols-3 gap-y-2 gap-x-5 py-2 px-10 mx-10 my-4 min-h-36 rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-white">
            
            <div>
                {{ index + 1 }}
            </div>
            <div class="">
                {{ student.first_name }} {{ student.last_name }}
            </div>
            <div class="">
                <span class="material-symbols-outlined text-lg text-red-700">delete</span>
            </div>
        
        </div>

    </div>
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
</template>

<script>
import axios from 'axios';
import Modal from '@/components/Modal.vue'


export default({
    name: 'Students',
    async mounted(){
        document.title = 'All Students'
        await this.getAllStudents()
    },
    data() {
        return {
            students: [],
            addStudentCsvModal: {
                show: false,
                file: undefined,
            }
        }
    },
    methods: {
        async getAllStudents(){
            const response = await axios.get(`/api/v1/students`)
            this.students = response.data
        },
        setAddStudentFile(event){
            this.addStudentCsvModal.file = event.target.files[0]
        },
        async uploadStudentCsv(){
            let data = new FormData()
            data.append('file', this.addStudentCsvModal.file)
            const response = await axios.post(
                `/api/v1/students/csv`, 
                data,
                {
                    headers: {"Content-Type": "multipart/form-data",},
                }
            )
            if (response.status == 200){
                this.addStudentCsvModal.show = false
                this.getAllStudents()
            }else{
                //show the error in response.data
            }
        }
    },
    components: {
        Modal,
    },
})

</script>