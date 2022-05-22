<template>
    <div class="py-8 h-50 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-center ">
        <div>
            {{ resource.res_name }} <br>
            {{ resource.description }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="editName">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="$emit('delete')">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <modal :show="resourceEditModal.show" @cancel="resourceEditModal.show = false" @confirm="setName">
                <template #content>
                    <h1>Edit resource</h1>
                    <label for="name">Resource Name: </label><input name="name" type="text" v-model="resourceEditModal.name"><br>
                    <label for="desc">Resource Description: </label><input name="desc" type="text" v-model="resourceEditModal.desc">
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
                <button @click="fileAddModal.show = true">
                    + Add Files
                </button>
            </tr>
        </table>
        <modal :show="fileDeleteModal.show" @cancel="fileDeleteModal.show = false" @confirm="removeResourceFile()">
            <template #content>
                <h1>You sure you want to delete this file?</h1>
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
            <template #content>
                <h1>Add new file</h1>
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