<template>

    <div class="content">

        <div class="bg-cardclr border border-borderclr text-white h-34 mx-96 mt-10 rounded-md shadow-inner">
            <a href="/logout">
                <button class="bg-red-800 text-sm float-right mr-4 px-2 rounded"> Logout </button>
            </a><br>
            <div class="flex  w-full mx-4 my-5">
                <img class="w-20 rounded-full" :src="user.get_image" alt="class picture">

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

        <!-- {{user}} -->

        <div class="grid grid-cols-3 gap-10 py-14 px-4 text-white">

            <div v-for="classs in classes" :key="classs.id" class="flex items-center h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl cursor-pointer" @click="clickCard">
                

                <img class="h-24 rounded-2xl px-3 py-1" :src="classs.subject.image" alt="student picture">
                <div class="w-full ml-8">
                    <!-- <router-link :to="'/labs/'"> -->
                    <span> {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }} </span><br>
                    <p class="text-sm text-gray-300"> {{ classs.department.dept_name }} </p>
                    <p class="text-sm text-gray-300"> S{{ classs.semester.sem }} - {{ classs.department.dept_code }} </p>
                    <!-- </router-link> -->
                </div>
              
            </div>

            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 4</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 5</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 6</div>
        </div>

    </div>

</template>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

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
                    this.classes[eachClass].subject.image = "https://telegra.ph/file/9326a1797d1e96975cde9.png";
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
    computed: {
        ...mapGetters([
            'user',
        ]),
    }
})
</script>