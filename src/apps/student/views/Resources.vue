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
                        <option value="recent">Recent</option>
                        <option value="star">Starred</option>
                        <option value="date">Date</option>
                        <option value="alph">Alphabet</option>
                    </select>
                </div>   
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
                                    <p> {{ resource.res_name }} </p>
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
        /api/v1/resources               current semester
        /api/v1/resources/<int:sem>     sem semester
        eg:- /api/v1/resources/7        7th semester
    */
    name: 'Resources',
    mounted(){
        document.title = 'Resources',
        this.getResources()
    },
    data(){
        return{
            subjects: {}
        }
    },
    methods: {
        getResources(){
            axios({
                method: 'get',
                url: '/api/v1/resources',
            }).then(response => this.subjects = response.data)
        },
    },
})
</script>