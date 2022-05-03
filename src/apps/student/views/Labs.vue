<template>
    <div class="content">
        <div class="header">
            <p> Your Lab works </p>
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
            <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sem" name="sem">
                <option value="S8" selected>S8</option>
                <option value="S7">S7</option>
                <option value="S6">S6</option>
                <option value="S5">S5</option>
                <option value="S4">S4</option>
                <option value="S3">S3</option>
                <option value="S2">S2</option>
                <option value="S1">S1</option>
            </select>
        </div>
        <!-- {{ labs }} -->
        <div class="grid grid-cols-2 gap-10 py-14 px-8 text-white">
            <LabItem v-for="lab in labs" :lab="lab" :key="lab.id" />
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 1</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 4</div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import LabItem from '../components/LabItem.vue'

export default({
    name: 'Labs',
    components: {
        LabItem
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
        async getLabs(){
            var url = '/api/v1/labs';

            const response = await axios.get(url);
            this.labs = response.data;
            this.updateImages()
        },
        updateImages(){
            for(let eachLab in this.labs){

                if(!this.labs[eachLab].subject.image){
                    this.labs[eachLab].subject.image = "https://tghost.cf/17281/image_2022-05-02_18-59-12.png?hash=AgADNQ";
                }
                else{
                    this.labs[eachLab].subject.image = axios.defaults.baseURL + this.labs[eachLab].subject.image;
                }
            }

        }
    },
})
</script>
