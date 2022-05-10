<template>
    <div class="content">
        <div class="header">
            <p> Your Labs </p>
        </div>

        <div class="search-sort-box">
                <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Labs"/>
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
            <label class="text-white text-lg" for="sem">Labs: </label>
            <semester-select-box :sems="user.profile.semesters" @selectSem="selectSem"/>
        </div>
        <!-- {{ labs }} -->
        <div class="grid grid-cols-2 gap-10 py-14 px-8 text-white">
            <LabItem v-for="lab in labs" :lab="lab" :key="lab.id" />
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 1</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 4</div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import LabItem from '../../components/LabItem.vue'
import SemesterSelectBox from '../../components/SemesterSelectBox.vue'

export default({
    name: 'Labs',
    components: {
        LabItem,
        SemesterSelectBox,
    },
    mounted(){
        document.title = 'Labs'
        this.getLabs()
    },
    data(){
        return{
            labs: {}
        }
    },
    methods: {
        async getLabs(sem){
            var url = '/api/v1/labs';
            if(sem != undefined){
                if(sem != 0){
                    url += `/sem/${sem}`
                }
            }else{
                url += '/sem'
            }

            const response = await axios.get(url);
            this.labs = response.data;
            this.updateImages()
            //console.log(url)
        },
        updateImages(){
            for(let eachLab in this.labs){

                if(!this.labs[eachLab].subject.image){
                    this.labs[eachLab].subject.image = "https://telegra.ph/file/9326a1797d1e96975cde9.png";
                }
                else{
                    this.labs[eachLab].subject.image = axios.defaults.baseURL + this.labs[eachLab].subject.image;
                }
            }

        },
        async selectSem(sobj){
            await this.getLabs(sobj.sem)
            document.title = `Labs: ${sobj.text}`
        },
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    }
})
</script>
