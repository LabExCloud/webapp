<template>

    <div class="content">
        <div class="header">
            <p> Resources </p>
        </div>
        
        <!-- <div class="search-sort-box">
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
        </div> -->
    </div>
</template>


<script>
import axios from 'axios'

export default({
    name: 'Resources',
    mounted(){
        document.title = 'Resources'
    },
})
</script>