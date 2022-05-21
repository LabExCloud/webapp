<template>

    <div class="content">
        <div class="header">
            <p> Resources </p>
        </div>
        
        <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Resources"/>
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md">
                    <router-link to="/demo/addresource">
                        <span class="mx-4">+ New Resource</span>
                    </router-link>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <resource-card v-for="resource in resources" :key="resource.id" :res_id="resource.id"/>
        </div>

    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import ResourceCard from '../../components/ResourceCard.vue'

export default({
    name: 'Resources',
    data(){
        return {
            resources: [],
        }
    },
    components: {
        ResourceCard
    },
    async mounted(){
        document.title = `Resources`
        await this.getResources()
    },
    methods: {
        async getResources(){
            var url = `/api/v1/resources/class/${this.class_id}`
            const response = await axios.get(url);
            this.resources = response.data.resources;
        },
    },
    computed: {
        ...mapGetters([
            'class_id',
        ]),
    }
})
</script>