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

        <div class="w-full mt-6">
            <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 text-white">
                    <label for="batch">Batch: </label>
                </div>
                <select class="rounded bg-gray-600 text-black" name="batch" @change="batch = parseInt($event.target.value)">
                    <option v-for="(batch, index) in options.batches" :selected="batch == index" :value="index">{{ batch.year }} - {{ batch.stream }}</option>
                </select>
                    
            </div>

            <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 text-white">
                    <label for="semester">Semester: </label>
                </div>
                <div class="md:w-2/3">
                    <select class="rounded bg-gray-600 text-black" name="semester" @change="semester = parseInt($event.target.value)">
                        <option v-for="(sem, index) in this.options.semesters" :selected="semester == index" :value="index">S{{ sem }}</option>
                    </select>
                </div>
            </div>

            <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 text-white">
                    <label for="subject">Subject: </label>
                </div>
                <div class="md:w-2/3">
                    <select class="rounded bg-gray-600 text-black" name="subject" @change="subject = parseInt($event.target.value)">
                        <option v-for="(sub, index) in options.subjects" :selected="subject == index" :value="index">{{ sub.sub_code }} - {{ sub.sub_name }}</option>
                    </select>
                </div>
            </div>

            <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 text-white">
                    <label for="islab">Is Lab:</label>
                </div>
                <input class="rounded bg-gray-600" type="checkbox" name="islab" v-model="is_lab">
            </div>

            <div class="md:flex md:items-center mb-2">
                <button class="bg-gray-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3" @click="discard">Discard</button>
                <button class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3" @click="save">Update</button>
                <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3" @click="showDeleteClass = true">Delete</button>
            </div>

        </div>
    </div>

</template>


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

        await this.fetchOptions()

        this.semester = this.classs.semester.id - 1
        this.subject = this.options.subjects.findIndex(obj => obj.id == this.classs.subject.id)
        this.batch = this.options.batches.findIndex(obj => obj.id == this.classs.batch.id)
        this.is_lab = this.classs.is_lab
    },
    data(){
        return{
            options: {
                semesters: [],
                batches: [],
                subjects: [],
            },
            semester: undefined,
            subject: undefined,
            batch: undefined,
            is_lab: false,
            showDeleteClass: false,
        }
    },
    methods: {
        async fetchOptions(){
            const response1 = await axios.get('/api/v1/base/batches')
            this.options.batches = response1.data

            const response2 = await axios.get('/api/v1/base/subjects')
            this.options.subjects = response2.data
        },
        async deleteClass(){
            const response = await axios.delete(`/api/v1/class/${this.classs.id}`)
            location.href = '/teachers'
        },
        async save(){
            const subject = this.options.subjects[this.subject].id
            const batch = this.options.batches[this.batch].id
            const semester = this.options.semesters[this.semester]
            const response = await axios.put(`/api/v1/class/${this.classs.id}`, {
                department: this.classs.department.id,
                semester,
                subject,
                batch,
                // teachers: ,  // optional
                is_lab: this.is_lab
            })

            this.$store.commit('SET_CLASSS', response.data)
        },
        discard(){
            this.semester = this.classs.semester.id - 1
            this.subject = this.options.subjects.findIndex(obj => obj.id == this.classs.subject.id)
            this.batch = this.options.batches.findIndex(obj => obj.id == this.classs.batch.id)
            this.is_lab = this.classs.is_lab
        },
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    },
    watch: {
        batch(){
            const stream = this.options.batches[this.batch].stream
            if(stream === 'B.Tech'){
                this.options.semesters = [1, 2, 3, 4, 5, 6, 7, 8]
            }else if(stream === 'M.Tech'){
                this.options.semesters = [1, 2, 3, 4]
            }else{
                this.options.semesters = []
            }
        }
    }
})
</script>