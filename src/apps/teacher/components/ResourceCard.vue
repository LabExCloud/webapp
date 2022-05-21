<template>
    <div class="py-8 h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-center ">
        <div>
            {{ resource.res_name }} <br>
            {{ resource.description }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="editName">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <modal :show="resourceEditModal.show" @close="resourceEditModal.show = false" @ok="setName">
                <template #content>
                    <label for="name">Resource Name: </label><input name="name" type="text" v-model="resourceEditModal.name"><br>
                    <label for="desc">Resource Description: </label><input name="desc" type="text" v-model="resourceEditModal.desc">
                </template>
            </modal>
        </div>
        <br>
        <table class="w-full">
            <tr class="cursor-pointer" v-for="file in resource.res_files" :key="file.id">
                <td>
                    <p> {{ file.filename }} </p>
                </td>
            </tr>
        </table>
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
            this.fetchFiles(newVal)
        }
    },
    methods: {
        async fetchFiles(id){
            var url = `/api/v1/resources/res/${id}`
            const response = await axios.get(url)
            this.resource = response.data
        },
        editName(){
            this.resourceEditModal.name = this.resource.res_name
            this.resourceEditModal.desc = this.resource.description
            this.resourceEditModal.show = true
        },
        async setName(){
            var url = `/api/v1/resources/res/${this.resource.id}`
            const response = await axios.put(url, {
                res_name: this.resourceEditModal.name,
                description: this.resourceEditModal.desc
            })

            this.resource.res_name = response.data.res_name
            this.resource.res_name = response.data.res_name

            console.log(this.resource)

            this.resourceEditModal.show = false
        }
    },
    async mounted(){
        await this.fetchFiles(this.res_id)
    }
})
</script>