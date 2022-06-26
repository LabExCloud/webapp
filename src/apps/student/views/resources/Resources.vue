<template>

    <div class="content">
        <div class="header">
            <p> Your Resources </p>
        </div>
        
        <!-- <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Resources"/>
            <div class="sort-box">
                <label class="text-white" for="sort">sort: </label>
                <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sort" name="sort">
                    <option value="recent" selected>Recent</option>
                    <option value="star">Starred</option>
                    <option value="date">Date</option>
                    <option value="alph">Alphabet</option>
                </select>
            </div> 
        </div> -->
        <div class="w-full pl-7">
            <label class="text-white text-lg" for="sem">Resources: </label>
            <semester-select-box :sems="user.profile.semesters" @selectSem="selectSem"/>
        </div>


        <div class="grid grid-cols-2 gap-10 py-14 px-8 text-white">
            <div v-for="subject in subjects" :key="subject.id" class="py-8 min-h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-center ">
                {{ subject.sub_name }} <br><br>
                <table class="w-full">
                        <tr class="hover:bg-mainclr-200 cursor-pointer" v-for="resource in subject.resources" :key="resource.id" @click="cardClick(resource.id)">
                            <td>
                                <!-- <router-link :to="'/resources/res/' + resource.id"> -->
                                <p> {{ resource.res_name }} </p>
                                <!-- </router-link> -->
                            </td>
                            <td>
                                <date-view v-model="resource.created"/>
                            </td>
                            <!-- <td>
                                <p>tag</p>
                            </td> -->
                        </tr>
                </table>
            </div><br>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import SemesterSelectBox from '@/components/SemesterSelectBox.vue'
import DateView from '@/components/DateView.vue'

export default({
    name: 'Resources',
    components:{
        SemesterSelectBox,
        DateView,
    },
    async mounted(){
        document.title = `Resources: S${this.user.profile.semester}`
        await this.getResources()
    },
    data(){
        return{
            subjects: {},
        }
    },
    methods: {
        async getResources(sem){
            var url = '/api/v1/resources'
            if(sem != undefined){
                if(sem != 0){
                    url += `/sem/${sem}`
                }
            }else{
                url += '/sem'
            }
            const response = await axios.get(url);
            this.subjects = response.data;
        },
        cardClick(id){
            this.$router.push(`/resources/res/${id}`)
        },
        async selectSem(sobj){
            await this.getResources(sobj.sem)
            document.title = `Resources: ${sobj.text}`
        },
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    }
})
</script>