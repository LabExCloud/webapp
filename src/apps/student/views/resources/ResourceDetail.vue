<template>

    <div class="content">
        <div class="header">
            <p> {{ resource.res_name }} </p>
        </div>
        
        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <!-- {{ resource }} -->
            <div class="py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center ">

                <table class="w-full">
                    <tr v-for="file in resource.res_files" :key="file.id">
                        <td>
                            <p>
                                <a :href="file.url" target="_blank">{{ file.filename }}</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
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

        /api/v1/resources/res/<int:r_id>    resource with id r_id
        eg:- /api/v1/resources/res/3        resurce with id 3
    */
    name: 'ResourceDetail',
    mounted(){
        document.title = 'Resource: ' + this.resource.res_name
        this.getResource()
    },
    data(){
        return{
            resource: {}
        }
    },
    methods: {
        getResource(){
            axios({
                method: 'get',
                url: '/api/v1/resources/res/' + this.$route.params.res,
            }).then(response => this.resource = response.data)
        },
    },
})
</script>