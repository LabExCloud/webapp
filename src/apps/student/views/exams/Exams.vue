<template>

    <div class="content">
        <div class="header">
            <p> Your Exams </p>
        </div>
        
        <div class="search-sort-box">
                <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Exams"/>
                <div class="sort-box">
                    <label class="text-white" for="sort">sort: </label>
                    <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sort" name="sort">
                        <option value="recent" selected>Recent</option>
                        <option value="star">Starred</option>
                        <option value="date">Date</option>
                        <option value="alph">Alphabet</option>
                    </select>
                </div>   
        </div>
        <div class="w-full pl-7">
            <label class="text-white text-lg" for="sem">Exams: </label>
            <!-- <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sem" name="sem">
                <option value="S8" selected>S8</option>
                <option value="S7">S7</option>
                <option value="S6">S6</option>
                <option value="S5">S5</option>
                <option value="S4">S4</option>
                <option value="S3">S3</option>
                <option value="S2">S2</option>
                <option value="S1">S1</option>
            </select> -->
            <semester-select-box :sems="user.profile.semesters" @selectSem="selectSem"/>
        </div>

        <!-- {{ exams }} -->
        <div class="grid grid-cols-2 gap-10 py-14 px-8 text-white">

            <div v-for="exam in exams" :key="exam.id" class="lab-item cursor-pointer"  @click="clickCard(exam.id)">
                <div class="flex  ml-4 mt-4">
                    <img :src="exam.subject.image" alt="subject image" class="h-24 w-24 rounded-2xl">
                    <div class="w-full flex flex-col px-6">
                        <p class="title">{{ exam.subject.sub_code }} - {{ exam.subject.sub_name }}</p>
                        <p class="name text-gray-400"> - {{ exam.owner.first_name + " " + exam.owner.last_name }}</p>
                    </div>
                </div>
                <ul class="ml-12 mt-2 list-disc text-sm">
                    <li>
                        Duration: 60 min
                    </li>
                    <li>
                        Questions: 4
                    </li>
                </ul>

            </div>

            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 4</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import SemesterSelectBox from '../../components/SemesterSelectBox.vue'

export default({
    name: 'Exams',
    components: {
        SemesterSelectBox,
    },
    mounted(){
        document.title = 'Exams'
        this.getExams()
    },
    data(){
        return{
            exams: {}
        }
    },
    methods: {
        async getExams(sem){
            var url = '/api/v1/labs';
            if(sem != undefined){
                if(sem != 0){
                    url += `/sem/${sem}`
                }
            }else{
                url += '/sem'
            }

            const response = await axios.get(url);
            this.exams = response.data;
            this.updateImages()
        },
        updateImages(){
            for(let eachExam in this.exams){

                if(!this.exams[eachExam].subject.image){
                    this.exams[eachExam].subject.image = "https://telegra.ph/file/9326a1797d1e96975cde9.png";
                }
                else{
                    this.exams[eachExam].subject.image = axios.defaults.baseURL + this.exams[eachExam].subject.image;
                }
            }

        },
        clickCard(id){
            this.$router.push(`/exams/exam/info/${id}`)
        },
        async selectSem(sobj){
            await this.getExams(sobj.sem)
            document.title = `Exams: ${sobj.text}`
        },
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
    }
})
</script>
