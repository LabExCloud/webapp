<template>

    <div class="content">

        <modal :show="classAddModal.show" @cancel="classAddModal.show = false" @confirm="addClass">
            <template #header>
                <h1 class="text-xl text-gray-400">Add new Class</h1>
            </template>
            <template #content>

                <div class="w-full mt-6">
                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label for="batch">Batch: </label>
                        </div>
                        <select class="rounded bg-gray-600 text-black" name="batch" @change="classAddModal.batch = parseInt($event.target.value)">
                            <option v-for="(batch, index) in classAddModal.options.batches" :value="index">{{ batch.year }} - {{ batch.stream }}</option>
                        </select>
                            
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label for="semester">Semester: </label>
                        </div>
                        <div class="md:w-2/3">
                            <select class="rounded bg-gray-600 text-black" name="semester" @change="classAddModal.semester = parseInt($event.target.value)">
                                <option disabled selected value> -- select an option -- </option>
                                <option v-for="(sem, index) in this.classAddModal.options.semesters" :value="index">S{{ sem }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label for="subject">Subject: </label>
                        </div>
                        <div class="md:w-2/3">
                            <select class="rounded bg-gray-600 text-black" name="subject" @change="classAddModal.subject = parseInt($event.target.value)">
                                <option disabled selected value> -- select an option -- </option>
                                <option v-for="(subject, index) in classAddModal.options.subjects" :value="index">{{ subject.sub_code }} - {{ subject.sub_name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label for="islab">Is Lab:</label>
                        </div>
                        <input class="rounded bg-gray-600" type="checkbox" name="islab" v-model="classAddModal.is_lab">
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

        <div class="flex justify-center items-center">
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
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md" @click="showAddClassModal">
                    <span class="mx-4">+ New Class</span>
                </button>
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

        

        <div class="grid grid-cols-3 gap-10 py-14 px-4 text-white">

            <div v-for="(classs, index) in classes" :key="classs.id" class="flex items-center h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl cursor-pointer" @click="clickCard(classs)">
                <img class="h-24 rounded-2xl px-3 py-1" :src="classs.subject.image" alt="student picture">
                <div class="w-full ml-8">
                    <span> {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }} </span><br>
                    <p class="text-sm text-gray-300"> {{ classs.department.dept_name }} </p>
                    <p class="text-sm text-gray-300"> S{{ classs.semester.sem }} - {{ classs.department.dept_code }} - {{ classs.batch.stream }} - {{ classs.batch.year }} </p>
                </div>
                
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
            classAddModal: {
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
        clickCard(c){
            this.$store.commit('SET_CLASSS', c)
            if(c.is_lab){
                this.$router.push('/labs')
            }else{
                this.$router.push('/resources')
            }
        },
        settings(){
            this.$router.push('/profile')
        },
        async showAddClassModal(){
            const response1 = await axios.get('/api/v1/base/batches')
            this.classAddModal.options.batches = response1.data

            const response2 = await axios.get('/api/v1/base/subjects')
            this.classAddModal.options.subjects = response2.data

            this.classAddModal.batch = 0
            this.classAddModal.semester = undefined
            this.classAddModal.subject = undefined
            this.classAddModal.is_lab = false

            this.classAddModal.show = true
        },
        async addClass(){
            const subject = this.classAddModal.options.subjects[this.classAddModal.subject].id
            const batch = this.classAddModal.options.batches[this.classAddModal.batch].id
            const semester = this.classAddModal.options.semesters[this.classAddModal.semester]
            const response = await axios.post('/api/v1/class', {
                department: this.user.profile.department.id,
                semester,
                subject,
                batch,
                // teachers: ,  // optional
                is_lab: this.classAddModal.is_lab
            })
            

            this.classAddModal.show = false
            await this.getClasses()
        }
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    },
    watch: {
        'classAddModal.batch': function(){
            const stream = this.classAddModal.options.batches[this.classAddModal.batch].stream
            if(stream === 'B.Tech'){
                this.classAddModal.options.semesters = [1, 2, 3, 4, 5, 6, 7, 8]
            }else if(stream === 'M.Tech'){
                this.classAddModal.options.semesters = [1, 2, 3, 4]
            }else{
                this.classAddModal.options.semesters = []
            }
        }
    }
})
</script>