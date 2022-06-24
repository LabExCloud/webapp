<template>

    <div class="content">
        <div class="header">
            <p> Class Settings </p>
        </div>


        <modal :show="showDeleteClass" @cancel="showDeleteClass = false" @confirm="deleteClass()">
            <template #header>
                <h1>You sure you want to delete this Class?</h1>
            </template>
            <template #content>
                <h2 class="mt-4 text-gray-400">S{{ classs.semester.sem }} - {{ classs.department.dept_name }} - {{ classs.batch.stream }} - {{ classs.batch.year }} - {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }}</h2>
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                Delete
            </template>
        </modal>
        <modal :show="addTeacherModal.show" @cancel="addTeacherModal.show = false" @confirm="addTeacher">
            <template #header>
                <h1 class="mb-4 text-xl text-gray-400">Add Teacher to this class</h1>
            </template>
            <template #content>
                <div class="w-full mt-4">
                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label for="search">Search: </label>
                        </div>
                        <div class="md:w-2/3">
                            <input list="teachers" class="rounded bg-gray-600 text-black" name="search" type="text" v-model="addTeacherModal.username" autocomplete="off">
                            <datalist v-if="addTeacherModal.teachers" id="teachers">
                                <option v-for="teacher in addTeacherModal.teachers" :value="teacher.username">{{ teacher.username }} - {{ teacher.first_name }}</option>
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

        <!-- TODO: implement remove teacher, fix css -->

        <div class="w-full mt-6 px-10 py-5">
            <div class="md:flex md:items-center mb-2">
                
            </div>
            <div v-for="(teacher, index) in classs.teachers" :key="index" class="grid grid-cols-2 gap-y-2 gap-x-5 py-2 px-10 mx-10 my-4 min-h-36 rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-white">
                <div>
                    {{ teacher.first_name }} {{ teacher.last_name }}
                </div>
                <div>
                    <button>
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            
            </div>

            <div class="md:flex md:items-center mb-2">
                <div class="md:w-5/6">
                    <button class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3" @click="showAddTeacherModal">Add teachers</button>
                </div>
                <div class="md:w-1/6">
                    <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3 float-right" @click="showDeleteClass = true">Delete Class</button>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
select{
    width: 100%
}

.label{
    @apply md:w-1/5 text-white justify-end
}

.input{
    @apply md:w-4/5
}
</style>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue'

export default({
    name: 'Settings',
    components: {
        Modal,
    },
    async mounted(){
        document.title = 'Class Settings'
    },
    data(){
        return{
            addTeacherModal: {
                show: false,
                teachers: [],
                username: '',
            },
            showDeleteClass: false,
        }
    },
    methods: {
        showAddTeacherModal(){
            this.getTeachers()
            this.addTeacherModal.show = true
        },
        async getTeachers(){
            const response = await axios.get('/api/v1/teachers')
            this.addTeacherModal.teachers = response.data
        },
        async deleteClass(){
            const response = await axios.delete(`/api/v1/class/${this.classs.id}`)
            location.href = '/teachers'
        },
        async addTeacher(){
            const teacher = this.addTeacherModal.teachers.find(t => t.username === this.addTeacherModal.username)
            var teachers = []
            this.classs.teachers.forEach(t => {
                teachers.push(t.teacher)
            });
            teachers.push(teacher.teacher)

            const response = await axios.put(`/api/v1/class/${this.classs.id}`, {
                department: this.classs.department.id,
                semester: this.classs.semester.id,
                subject: this.classs.subject.id,
                batch: this.classs.batch.id,
                teachers: teachers
            })

            this.$store.commit('SET_CLASSS', response.data)
            this.addTeacherModal.show = false
        },
        discard(){
        },
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    },
    watch: {
    }
})
</script>