<template>

    <div class="content">

        <modal :show="classAddEditModal.show" @cancel="classAddEditModal.show = false" @confirm="addEditClass">
            <template #header>
                <h1>{{ classAddEditModal.edit?'Edit':'Add new' }} Class</h1>
            </template>
            <template #content>
                <label for="batch">Batch: </label>
                <select name="batch" @change="classAddEditModal.batch = parseInt($event.target.value)">
                    <option v-for="(batch, index) in classAddEditModal.options.batches" :selected="classAddEditModal.batch == index" :value="index">{{ batch.year }} - {{ batch.stream }}</option>
                </select><br>
                
                <label for="semester">Semester: </label>
                <select name="semester" @change="classAddEditModal.semester = parseInt($event.target.value)">
                    <option disabled :selected="!classAddEditModal.edit" value> -- select an option -- </option>
                    <option v-for="(sem, index) in this.classAddEditModal.options.semesters" :selected="classAddEditModal.semester == index" :value="index">S{{ sem }}</option>
                </select><br>

                <label for="subject">Subject: </label>
                <select name="subject" @change="classAddEditModal.subject = parseInt($event.target.value)">
                    <option disabled :selected="!classAddEditModal.edit" value> -- select an option -- </option>
                    <option v-for="(subject, index) in classAddEditModal.options.subjects" :selected="classAddEditModal.subject == index" :value="index">{{ subject.sub_code }} - {{ subject.sub_name }}</option>
                </select><br>

                <label for="islab">Is Lab</label>
                <input type="checkbox" name="islab" v-model="classAddEditModal.is_lab">
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                {{ classAddEditModal.edit?'Save':'Create' }}
            </template>
        </modal>
        <modal :show="deleteClassModal.show" @cancel="deleteClassModal.show = false" @confirm="deleteClass()">
            <template #header>
                <h1>You sure you want to delete this Class?</h1>
            </template>
            <template #content>
                <h2>S{{ deleteClassModal.c.semester.sem }} - {{ deleteClassModal.c.department.dept_name }} - {{ deleteClassModal.c.batch.stream }} - {{ deleteClassModal.c.batch.year }} - {{ deleteClassModal.c.subject.sub_code }} - {{ deleteClassModal.c.subject.sub_name }}</h2>
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                Delete
            </template>
        </modal>

        <div class="flex justify-center">
            <div class="bg-cardclr border border-borderclr text-white h-34 w-[610px] mt-10 rounded-md shadow-inner">
            
            <a href="/logout">
                <button class="bg-red-800 text-sm float-right mr-4 px-2 mt-2 rounded"> Logout </button>
            </a>
            
            <span class="material-symbols-outlined float-right text-lg mr-5 mt-1 cursor-pointer" @click="settings" > settings </span>
            <br>
            <div class="flex  w-full mx-4 my-5">
                <profile-image class="w-24 rounded-full border-2 border-white" :src="user.image" alt="teacher picture"/>

                <div class="grid grid-cols-2 gap-y-1 gap-x-[1px] ml-10">
                    <div>
                        Name:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        {{ `${user.first_name}${user.middle_name ? ` ${user.middle_name} ` : ' '}${user.last_name}` }}
                    </div>
                    
                    <div>
                        Department:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        {{ user.profile.department.dept_name }}
                    </div>
                
                    <div>
                        Active Classes:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        {{ classes.length }}
                    </div>   
                </div>
            </div>
            </div>
        </div>
        


        <div class="w-full pl-7">
            <label class="text-white text-lg" for="year">Classes: </label>
            <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="year" name="year">
                <option value="all" selected>All</option>
                <option value="2122">2021-22</option>
                <option value="2021">2020-21</option>
                <option value="1920">2019-20</option>
                <option value="1819">2018-19</option>
                <option value="1718">2017-18</option>
            </select>
        </div>

        <div class="add-box">
            <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md" @click="showAddClassModal">
                <span class="mx-4">+ New Class</span>
            </button>
        </div>

        <div class="grid grid-cols-3 gap-10 py-14 px-4 text-white">

            <div v-for="(classs, index) in classes" :key="classs.id" class="flex items-center h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl cursor-pointer" @click="clickCard(classs.id)">
                <img class="h-24 rounded-2xl px-3 py-1" :src="classs.subject.image" alt="student picture">
                <div class="w-full ml-8">
                    <span> {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }} </span><br>
                    <p class="text-sm text-gray-300"> {{ classs.department.dept_name }} </p>
                    <p class="text-sm text-gray-300"> S{{ classs.semester.sem }} - {{ classs.department.dept_code }} - {{ classs.batch.stream }} - {{ classs.batch.year }} </p>
                </div>
                <span class="material-symbols-outlined cursor-pointer text-lg text-blue-400 float-right mr-2 pt-2" @click="showEditClassModal($event, index)">edit</span>
                <span class="material-symbols-outlined cursor-pointer text-lg text-red-600 float-right mr-4 pt-2" @click="showDeleteClass($event, index)">delete</span>
                
            </div>
        </div>

    </div>

</template>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import ProfileImage from '@/components/ProfileImage.vue'
import Modal from '@/components/Modal.vue'
import SemesterSelectBox from '@/components/SemesterSelectBox.vue'

export default({
    name: 'Home',
    components: {
        ProfileImage,
        Modal,
        SemesterSelectBox,
    },
    async mounted(){
        document.title = 'Home'
        await this.getClasses();
    },
    data(){
        return{
            classes: {},
            classAddEditModal: {
                id: undefined,
                semester: undefined,
                subject: undefined,
                batch: undefined,
                is_lab: false,
                options: {
                    batches: [],
                    subjects: [],
                    semesters: [],
                },
                show: false,
                edit: false,
            },
            deleteClassModal: {
                show: false,
                c: undefined,
            },
        }
    },
    methods: {
        async getClasses(){
            var url = '/api/v1/classes';

            const response = await axios.get(url);
            this.classes = response.data;
            this.updateImages()
        },
        updateImages(){
            for(let eachClass in this.classes){

                if(!this.classes[eachClass].subject.image){
                    this.classes[eachClass].subject.image = "https://telegra.ph/file/9326a1797d1e96975cde9.png";
                }
                else{
                    this.classes[eachClass].subject.image = axios.defaults.baseURL + this.classes[eachClass].subject.image;
                }
            }

        },
        clickCard(id){
            this.$store.commit('SET_CLASS_ID', id)
            this.$router.push('/labs')
        },
        settings(){
            this.$router.push('/profile')
        },
        async showAddClassModal(){
            const response1 = await axios.get('/api/v1/base/batches')
            this.classAddEditModal.options.batches = response1.data

            const response2 = await axios.get('/api/v1/base/subjects')
            this.classAddEditModal.options.subjects = response2.data

            this.classAddEditModal.batch = 0
            this.classAddEditModal.semester = undefined
            this.classAddEditModal.subject = undefined
            this.classAddEditModal.is_lab = false

            this.classAddEditModal.edit = false

            this.classAddEditModal.show = true
        },
        async showEditClassModal(event, index){
            event.stopPropagation()
            const response1 = await axios.get('/api/v1/base/batches')
            this.classAddEditModal.options.batches = response1.data

            const response2 = await axios.get('/api/v1/base/subjects')
            this.classAddEditModal.options.subjects = response2.data

            const c = this.classes[index]

            this.classAddEditModal.id = c.id

            this.classAddEditModal.batch = this.classAddEditModal.options.batches.findIndex(obj => obj.id == c.batch.id)

            this.classAddEditModal.semester = c.semester.id - 1
            
            this.classAddEditModal.subject = this.classAddEditModal.options.subjects.findIndex(obj => obj.id == c.subject.id)
            
            this.classAddEditModal.is_lab = c.is_lab

            this.classAddEditModal.edit = true

            this.classAddEditModal.show = true
        },
        showDeleteClass(event, index){
            event.stopPropagation()
            this.deleteClassModal.c = this.classes[index]
            this.deleteClassModal.show = true
        },
        async addEditClass(){
            if(this.classAddEditModal.edit){
                const subject = this.classAddEditModal.options.subjects[this.classAddEditModal.subject].id
                const batch = this.classAddEditModal.options.batches[this.classAddEditModal.batch].id
                const semester = this.classAddEditModal.options.semesters[this.classAddEditModal.semester]
                const response = await axios.put(`/api/v1/class/${this.classAddEditModal.id}`, {
                    department: this.user.profile.department.id,
                    semester,
                    subject,
                    batch,
                    // teachers: ,  // optional
                    is_lab: this.classAddEditModal.is_lab
                })
            }else{
                const subject = this.classAddEditModal.options.subjects[this.classAddEditModal.subject].id
                const batch = this.classAddEditModal.options.batches[this.classAddEditModal.batch].id
                const semester = this.classAddEditModal.options.semesters[this.classAddEditModal.semester]
                const response = await axios.post('/api/v1/class', {
                    department: this.user.profile.department.id,
                    semester,
                    subject,
                    batch,
                    // teachers: ,  // optional
                    is_lab: this.classAddEditModal.is_lab
                })
            }
            

            this.classAddEditModal.show = false
            await this.getClasses()
        }
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    },
    watch: {
        'classAddEditModal.batch': function(){
            const stream = this.classAddEditModal.options.batches[this.classAddEditModal.batch].stream
            if(stream === 'B.Tech'){
                this.classAddEditModal.options.semesters = [1, 2, 3, 4, 5, 6, 7, 8]
            }else if(stream === 'M.Tech'){
                this.classAddEditModal.options.semesters = [1, 2, 3, 4]
            }else{
                this.classAddEditModal.options.semesters = []
            }
        }
    }
})
</script>