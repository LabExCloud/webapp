<template>

    <div class="content">
        <div class="flex justify-center items-center bg-cardclr border border-borderclr text-white h-32 mx-96 mt-10 rounded-md">
            <div class="flex  w-full mx-4 my-5">
                <img class="w-20 rounded-full" src="https://tghost.cf/17241/image_2022-05-02_10-13-00.png?hash=AgADDQ" alt="class picture">
                <div class="grid grid-cols-2 gap-y-1 gap-x-1 w-full ml-12">
                    <div>
                        Name:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        Steve Harry
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
                        8
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

        <!-- {{classes}} -->

        <div class="grid grid-cols-3 gap-10 py-14 px-4 text-white">

            <div v-for="classs in classes" :key="classs.id" class="flex items-center h-36 border border-borderclr rounded-2xl bg-cardclr cursor-pointer" @click="clickCard">
                

                <img class="h-24 rounded-2xl px-3 py-1" :src="classs.subject.image" alt="student picture">
                <div class="w-full ml-8">
                    <!-- <router-link :to="'/labs/'"> -->
                    <span> {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }} </span><br>
                    <p class="text-sm text-gray-300"> {{ classs.department.dept_name }} </p>
                    <p class="text-sm text-gray-300"> S{{ classs.semester.sem }} - {{ classs.department.dept_code }} </p>
                    <!-- </router-link> -->
                </div>
              
            </div>

            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 4</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 5</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 6</div>
        </div>

    </div>

</template>


<script>
import axios from 'axios'

export default({
    name: 'Home',
    async mounted(){
        document.title = 'Home'
        await this.getClasses();
    },
    data(){
        return{
            classes: {}
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
                    this.classes[eachClass].subject.image = "https://tghost.cf/17281/image_2022-05-02_18-59-12.png?hash=AgADNQ";
                }
                else{
                    this.classes[eachClass].subject.image = axios.defaults.baseURL + this.classes[eachClass].subject.image;
                }
            }

        },
        clickCard(){
            this.$router.push('/labs')
        }
    },
})
</script>