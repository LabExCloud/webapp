<template>

    <div class="content">

        <modal :show="classAddModal.show" @cancel="classAddModal.show = false" @confirm="addClass">
            <template #header>
                <h1>Add new Class</h1>
            </template>
            <template #content>
                <label for="name">Class Name: </label><input name="name" type="text" v-model="resourceAddModal.name"><br>
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                Create
            </template>
        </modal>

        <div class="bg-cardclr border border-borderclr text-white h-34 mx-96 mt-10 rounded-md shadow-inner">
            
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
                        Information Technology
                    </div>
                
                    <div>
                        Active Classes:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        {{ user.profile.classes.length}}
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

        <div class="grid grid-cols-3 gap-10 py-14 px-4 text-white">

            <div v-for="classs in classes" :key="classs.id" class="flex items-center h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl cursor-pointer" @click="clickCard(classs.id)">
                <img class="h-24 rounded-2xl px-3 py-1" :src="classs.subject.image" alt="student picture">
                <div class="w-full ml-8">
                    <span> {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }} </span><br>
                    <p class="text-sm text-gray-300"> {{ classs.department.dept_name }} </p>
                    <p class="text-sm text-gray-300"> S{{ classs.semester.sem }} - {{ classs.department.dept_code }} </p>
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

export default({
    name: 'Home',
    components: {
        ProfileImage,
        Modal,
    },
    async mounted(){
        document.title = 'Home'
        await this.getClasses();
    },
    data(){
        return{
            classes: {},
            classAddModal: {
                semester: '',
                subject: '',
                batch: '',
                is_lab: false,
                show: false
            }
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
        }
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    }
})
</script>