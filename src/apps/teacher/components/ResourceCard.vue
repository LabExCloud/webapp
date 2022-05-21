<template>
    <div class="py-8 h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-center ">
        {{ resource.res_name }} <br><br>
        <table class="w-full">
                <tr class="cursor-pointer" v-for="file in resourceFiles" :key="file.id">
                    <td>
                        <p> {{ resource.res_name }} </p>
                    </td>
                </tr>
        </table>
    </div><br>
</template>

<script>
import axios from 'axios'

export default({
    name: 'ResourceCard',
    data(){
        return {
            resourceFiles: []
        }
    },
    props: {
        resource: {
            type: Object,
            required: true
        }
    },
    methods: {
        async fetchFiles(id){
            var url = `/api/v1/resources/res/${id}`
            const response = await axios.get(url)
            this.resourceFiles = response.data.res_files
        }
    },
    async mounted(){
        await this.fetchFiles(this.resource.id)
    }
})
</script>