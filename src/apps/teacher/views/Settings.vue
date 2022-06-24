<template>

    <div class="content">
        <div class="header">
            <p> Class Settings </p>
        </div>


        <modal :show="showDeleteClass" @cancel="showDeleteClass = false" @confirm="deleteClass()">
            <template #header>
                <h1>You sure you want to delete this Class?</h1>
            </template>
            <template #content>
                <h2 class="mt-4 text-gray-400">S{{ classs.semester.sem }} - {{ classs.department.dept_name }} - {{ classs.batch.stream }} - {{ classs.batch.year }} - {{ classs.subject.sub_code }} - {{ classs.subject.sub_name }}</h2>
            </template>
            <template #cancel>
                Cancel
            </template>
            <template #confirm>
                Delete
            </template>
        </modal>

        <div class="w-full mt-6 px-10 py-5">
            <div class="md:flex md:items-center mb-2">
                <div class="md:w-5/6">
                    <button class="bg-gray-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3" @click="discard">Discard</button>
                    <button class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3" @click="save">Update</button>
                </div>
                <div class="md:w-1/6">
                    <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold mt-3 float-right" @click="showDeleteClass = true">Delete</button>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
select{
    width: 100%
}

.label{
    @apply md:w-1/5 text-white justify-end
}

.input{
    @apply md:w-4/5
}
</style>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue'

export default({
    name: 'Settings',
    components: {
        Modal,
    },
    async mounted(){
        document.title = 'Class Settings'
    },
    data(){
        return{
            showDeleteClass: false,
        }
    },
    methods: {
        async deleteClass(){
            const response = await axios.delete(`/api/v1/class/${this.classs.id}`)
            location.href = '/teachers'
        },
        async save(){
            // const response = await axios.put(`/api/v1/class/${this.classs.id}`, {
            //     // teachers: ,  // optional
            // })

            // this.$store.commit('SET_CLASSS', response.data)
        },
        discard(){
        },
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    },
    watch: {
    }
})
</script>