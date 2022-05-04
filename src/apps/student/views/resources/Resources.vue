<template>

    <div class="content">
        <div class="header">
            <p> Your Resources </p>
        </div>
        
        <div class="search-sort-box">
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
        </div>
        <div class="w-full pl-7">
            <label class="text-white text-lg" for="sem">Resources: </label>
            <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sem" name="sem" @change="selectSem">
                <option v-for="sem in user.profile.semesters" :key="sem" :value="sem">S{{ sem }}</option>
            </select>
        </div>


        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <div v-for="subject in subjects" :key="subject.id" class="py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center ">
                {{ subject.sub_name }} <br><br>
                <table class="w-full">
                        <tr class="cursor-pointer" v-for="resource in subject.resources" :key="resource.id" @click="cardClick(resource.id)">
                            <td>
                                <!-- <router-link :to="'/resources/res/' + resource.id"> -->
                                <p> {{ resource.res_name }} </p>
                                <!-- </router-link> -->
                            </td>
                            <td>
                                <p> {{ resource.createdFmt }} </p>
                            </td>
                            <td>
                                <p>tag</p>
                            </td>
                        </tr>
                </table>
            </div><br>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default({
    /*
        /api/v1/resources                   current semester

        /api/v1/resources/sem/<int:sem>     sem semester
        eg:- /api/v1/resources/sem/7        7th semester
        get the semester list from user.profile.semesters
        get the current semester from user.profile.semester

        /api/v1/resources/res/<int:r_id>    resource with id r_id
        eg:- /api/v1/resources/res/3        resurce with id 3
    */
    name: 'Resources',
    async mounted(){
        document.title = `Resources: S${this.user.profile.semester}`
        if(this.$route.params.sem){
            await this.getResources(this.$route.params.sem)
        }else{
            await this.getResources()
        }
        this.formatDate()
    },
    data(){
        return{
            subjects: {}
        }
    },
    methods: {
        async getResources(sem){
            var url = '/api/v1/resources'
            if(sem){
                url += `/sem/${sem}`
            }
            const response = await axios.get(url);
            this.subjects = response.data;
        },
        async selectSem(event){
            await this.getResources(event.target.value)
            document.title = `Resources: S${event.target.value}`
            this.formatDate()
        },
        formatDate(){
            const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            for(let sub in this.subjects){
                for(let res in this.subjects[sub].resources){
                    const date = new Date(this.subjects[sub].resources[res].created)
                    this.subjects[sub].resources[res].createdFmt = `${monthNames[date.getMonth()]} ${date.getDate()}`
                }
            }
        },
        cardClick(id){
            this.$router.push(`/resources/res/${id}`)
        }
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
    }
})
</script>