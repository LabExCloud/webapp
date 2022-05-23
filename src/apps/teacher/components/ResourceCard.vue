<template>
    <div class="py-8 h-50 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-center ">
        <div>
            <span class="material-symbols-outlined cursor-pointer float-right text-lg text-red-600 mr-5" @click="$emit('delete')">delete</span>
            <span class="material-symbols-outlined cursor-pointer float-right text-lg text-blue-400 mr-2" @click="editName">edit</span>
            {{ resource.res_name }} <br>
            {{ resource.description }}
            
            <modal :show="resourceEditModal.show" @cancel="resourceEditModal.show = false" @confirm="setName">
                <template #header>
                    <h1>Edit resource</h1>
                </template>
                <template #content>

                    <div class="w-full mt-4">
                        <div class="md:flex md:items-center mb-2">
                            <div class="md:w-1/3">
                                <label for="name">Resource Name: </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="rounded bg-gray-600" name="name" type="text" v-model="resourceEditModal.name">
                            </div>
                        </div>
                        <div class="md:flex md:items-center mb-2">
                            <div class="md:w-1/3">
                                <label for="desc">Resource Description: </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="rounded bg-gray-600" name="desc" type="text" v-model="resourceEditModal.desc">
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
        </div>
        <br>
        <table class="w-full">
            <tr class="cursor-pointer" v-for="(file, index) in resource.res_files" :key="index">
                <td>
                    <p> 
                        <a :href="file.url" target="_blank">{{ file.filename }}</a>
                    </p>
                </td>
                <td>
                    <button style="color: red; font-face:bold;" @click="showFileDeleteModal(index)">X</button>
                </td>
            </tr>
            <tr>
                <button @click="fileAddModal.show = true" class="bg-gray-600 rounded text-sm px-2 py-1 mt-3">
                    + Add Files
                </button>
            </tr>
        </table>
        <modal :show="fileDeleteModal.show" @cancel="fileDeleteModal.show = false" @confirm="removeResourceFile()">
            <template #header>
                <h1>You sure you want to delete this file?</h1>
            </template>
            <template #content>
                <h2>{{ resource.res_files[fileDeleteModal.index].filename }}</h2>
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                Delete
            </template>
        </modal>
        <modal :show="fileAddModal.show" @cancel="fileAddModal.show = false" @confirm="addResourceFile()">
            <template #header>
                <h1 class="mb-4">Add new file</h1>
            </template>
            <template #content>
                <label for="file">Choose File: </label><input name="file" type="file" @change="setFile($event)">
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                Add
            </template>
        </modal>
    </div><br>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'

export default({
    name: 'ResourceCard',
    data(){
        return {
            resource: {},
            resourceEditModal: {
                name: '',
                desc: '',
                show: false,
            },
            fileDeleteModal:{
                index: undefined,
                show: false,
            },
            fileAddModal: {
                file: undefined,
                show: false,
            }
        }
    },
    components: {
        Modal,
    },
    props: {
        res_id: {
            type: Number,
            required: true
        }
    },
    watch: {
        res_id(newVal){
            this.getResource(newVal)
        }
    },
    methods: {
        async getResource(id){
            const response = await axios.get(`/api/v1/resources/res/${id}`)
            this.resource = response.data

            this.resource.res_files.forEach(file => {
                file.url = process.env.VUE_APP_ROOT_MEDIA + file.file
            });
        },
        editName(){
            this.resourceEditModal.name = this.resource.res_name
            this.resourceEditModal.desc = this.resource.description
            this.resourceEditModal.show = true
        },
        async setName(){
            const response = await axios.put(`/api/v1/resources/res/${this.resource.id}`, {
                res_name: this.resourceEditModal.name,
                description: this.resourceEditModal.desc
            })

            this.resource.res_name = response.data.res_name
            this.resource.res_name = response.data.res_name

            console.log(this.resource)

            this.resourceEditModal.show = false
        },
        showFileDeleteModal(index){
            this.fileDeleteModal.index = index
            this.fileDeleteModal.show = true
        },
        async removeResourceFile(){
            const response = await axios.delete(`/api/v1/resources/file/${this.resource.res_files[this.fileDeleteModal.index].id}`)
            this.resource.res_files.splice(this.fileDeleteModal.index, 1)
            this.fileDeleteModal.show = false
        },
        async addResourceFile(){
            let data = new FormData()
            data.append('file', this.fileAddModal.file)
            const response = await axios.post(
                `/api/v1/resources/file/${this.resource.id}`,
                data,
                {
                    headers: {"Content-Type": "multipart/form-data",},
                }
            )
            this.resource.res_files.push(response.data)
            this.fileAddModal.show = false
        },
        setFile(event){
            this.fileAddModal.file = event.target.files[0]
        }
    },
    async mounted(){
        await this.getResource(this.res_id)
    }
})
</script>