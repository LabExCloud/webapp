<template>

    <div class="content">
        <div class="header">
            <p> Resources </p>
        </div>
        
        <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Resources"/>
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md" @click="resourceAddModal.show = true">
                    <span class="mx-4">+ New Resource</span>
                </button>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <resource-card v-for="(resource, index) in resources" :key="resource.id" :res_id="resource.id" @delete="showResourceDeleteModal(index)" />
        </div>

    </div>

    <modal :show="resourceDeleteModal.show" @cancel="resourceDeleteModal.show = false" @confirm="deleteResource">
        <template #header>
            <h1>You sure you want to delete this resource?</h1>
        </template>
        <template #content>
            <h2 class="mt-4 text-gray-400">{{ resources[this.resourceDeleteModal.index].res_name }}</h2>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Delete
        </template>
    </modal>
    <modal :show="resourceAddModal.show" @cancel="resourceAddModal.show = false" @confirm="addResource">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Add new resource</h1>
        </template>
        <template #content>
            <div class="w-full mt-4">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="name">Resource Name: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input class="rounded bg-gray-600 text-black" name="name" type="text" v-model="resourceAddModal.name">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="desc">Resource Description: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input class="rounded bg-gray-600 text-black" name="desc" type="text" v-model="resourceAddModal.desc">
                    </div>
                </div>
                        
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Save
        </template>
    </modal>
</template>


<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Modal from '@/components/Modal.vue'

import ResourceCard from '../../components/ResourceCard.vue'

export default({
    name: 'Resources',
    data(){
        return {
            resources: [],
            resourceDeleteModal:{
                index: undefined,
                show: false,
            },
            resourceAddModal: {
                name: '',
                desc: '',
                show: false
            }
        }
    },
    components: {
        ResourceCard,
        Modal,
    },
    async mounted(){
        document.title = `Resources`
        await this.getResources()
    },
    methods: {
        async getResources(){
            const response = await axios.get(`/api/v1/resources/class/${this.classs.id}`);
            this.resources = response.data.resources;
        },
        async deleteResource(){
            const response = await axios.delete(`/api/v1/resources/res/${this.resources[this.resourceDeleteModal.index].id}`)
            this.resources.splice(this.resourceDeleteModal.index, 1)
            this.resourceDeleteModal.show = false
        },
        showResourceDeleteModal(index){
            this.resourceDeleteModal.index = index
            this.resourceDeleteModal.show = true
        },
        async addResource(){
            const response = await axios.post(`/api/v1/resources/res/${this.classs.id}`, {
                res_name: this.resourceAddModal.name,
                description: this.resourceAddModal.desc
            })
            this.resourceAddModal.name = ''
            this.resourceAddModal.desc = ''

            this.resourceAddModal.show = false

            this.resources.push(response.data)
        }
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    }
})
</script>