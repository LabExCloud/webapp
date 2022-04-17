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

            <div v-for="subject in subjects" :key="subject.id" class="py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                {{ subject.subject }}
                <div v-for="resource in subject.resources" :key="resource.id">
                    <div>
                        {{ resource.res_name }}
                        <div v-for="file in resource.resource_files" :key="file.id">
                            <a :href="file.url" target="_blank">{{ file.filename }}</a>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
        </div>
    </div>

<!-- 
API Response for reference
[
    {
        "id": 1,
        "subject": "Data Analytics",
        "resources": [
            {
                "id": 1,
                "res_name": "Syllabus",
                "created": "2022-04-15T10:15:08.092971Z",
                "modified": "2022-04-15T10:15:08.093044Z",
                "resource_files": [
                    {
                        "id": 1,
                        "url": "http://127.0.0.1:8000/media/uploads/resources/IT404_Data_Analytics.pdf",
                        "filename": "IT404_Data_Analytics.pdf"
                    }
                ]
            },
            {
                "id": 3,
                "res_name": "Notes",
                "created": "2022-04-15T13:17:38.267098Z",
                "modified": "2022-04-15T13:17:59.075689Z",
                "resource_files": [
                    {
                        "id": 3,
                        "url": "http://127.0.0.1:8000/media/uploads/resources/Module_1.pdf",
                        "filename": "Module_1.pdf"
                    },
                    {
                        "id": 4,
                        "url": "http://127.0.0.1:8000/media/uploads/resources/Module_2.pdf",
                        "filename": "Module_2.pdf"
                    },
                    {
                        "id": 5,
                        "url": "http://127.0.0.1:8000/media/uploads/resources/Module_4.pdf",
                        "filename": "Module_4.pdf"
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "subject": "Cloud Computing",
        "resources": [
            {
                "id": 2,
                "res_name": "Syllabus",
                "created": "2022-04-15T12:52:32.009397Z",
                "modified": "2022-04-15T12:52:32.009478Z",
                "resource_files": [
                    {
                        "id": 2,
                        "url": "http://127.0.0.1:8000/media/uploads/resources/CS468_Cloud_Computing.pdf",
                        "filename": "CS468_Cloud_Computing.pdf"
                    }
                ]
            }
        ]
    }
]
 -->
</template>


<script>
import axios from 'axios'

export default({
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