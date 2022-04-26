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
                <!-- 
                    semester select dropdown 
                    default current semester
                -->
        </div>
        <div class="w-full pl-7">
            <label class="text-white text-lg" for="sem">Resources: </label>
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


        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">

            <!-- <div v-for="subject in subjects" :key="subject.id" class="py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                {{ subject.subject }}
                <div v-for="resource in subject.resources" :key="resource.id">
                    <div>
                        {{ resource.res_name }}
                        <div v-for="file in resource.resource_files" :key="file.id">
                            <a :href="file.url" target="_blank">{{ file.filename }}</a>
                            
                        </div>
                        
                    </div>
                </div>
            </div> -->
            <!-- <div> -->
                <div v-for="subject in subjects" :key="subject.id" class="py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center ">
                    {{ subject.sub_name }} <br><br>
                    <table class="w-full">
                            <tr v-for="resource in subject.resources" :key="resource.id">
                                <td>
                                    <router-link :to="'/resources/res/' + resource.id">
                                    <p> {{ resource.res_name }} </p>
                                    </router-link>
                                </td>
                                <td>
                                    <p> {{ resource.created }} </p>
                                </td>
                                <td>
                                    <p>tag</p>
                                </td>
                            </tr>
                    </table>
                </div><br>
            <!-- </div> -->
            
        </div>
    </div>
</template>


<script>
import axios from 'axios'

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
        document.title = 'Resources',
        await this.getResources()
        this.formatDate()
    },
    data(){
        return{
            subjects: {}
        }
    },
    methods: {
        async getResources(){
            var url = '/api/v1/resources'
            if(this.$route.params.sem){
                url += `/sem/${this.$route.params.sem}`
            }
            const response = await axios.get(url);
            this.subjects = response.data;
        },
        formatDate(){
            const fullDate = '2017-07-30T15:01:13Z';
            const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            const date = new Date(fullDate);
            console.log(`${monthNames[date.getMonth()]} ${date.getDate()}`) //test formated date
            console.log(JSON.stringify(this.subjects[0].resources[0].modified)); //api time
        }
    },
})
</script>