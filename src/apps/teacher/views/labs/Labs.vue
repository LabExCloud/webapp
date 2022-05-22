<template>
    <div class="content">
        <div class="header">
            <p> Lab Experiments </p>
        </div>

        <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Exps"/>
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md" @click="expAddModal.show = true">
                    <span class="mx-4">+ New Exp</span>
                </button>
            </div>
        </div>
        <!-- {{ exps }} -->
        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <lab-experiment-card v-for="(exp, index) in exps" :key="exp.id" :exp_id="exp.id" @delete="showDeleteExpModal(index)"/>

            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl">item 4</div>
        </div>
    </div>

    <modal :show="expDeleteModal.show" @cancel="expDeleteModal.show = false" @confirm="deleteExp">
        <template #header>
            <h1>You sure you want to delete this Experiment?</h1>
        </template>
        <template #content>
            <h2>{{ exps[this.expDeleteModal.index].exp_name }}</h2>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Delete
        </template>
    </modal>
    <modal :show="expAddModal.show" @cancel="expAddModal.show = false" @confirm="addExp">
        <template #header>
            <h1>Add new Experiment</h1>
        </template>
        <template #content>
            <label for="name">Experiment Name: </label><input name="name" type="text" v-model="expAddModal.name"><br>
            <label for="marks">Total Marks: </label><input name="marks" type="number" v-model="expAddModal.marks"><br>
            <label for="due">Due Date: </label><input name="due" type="date" v-model="expAddModal.due">
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Create
        </template>
    </modal>

</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import Modal from '@/components/Modal.vue'
import LabExperimentCard from '../../components/LabExperimentCard.vue'

export default({
    name: 'Labs',
    async mounted(){
        document.title = 'Lab'
        await this.getExps()
    },
    components: {
        Modal,
        LabExperimentCard,
    },
    data(){
        return{
            exps: [],
            expAddModal: {
                name: '',
                marks: 0,
                due: undefined,
                show: false,
            },
            expDeleteModal: {
                show: false
            }
        }
    },
    methods: {
        async getExps(){
            var url = `/api/v1/labs/${this.class_id}`;

            const response = await axios.get(url);
            this.exps = response.data;
        },
        async addExp(){
            const response = await axios.post(`/api/v1/labs/exp/${this.class_id}`, {
                exp_name: this.expAddModal.name,
                total_marks: this.expAddModal.marks,
                due_date: this.expAddModal.due
            })
            this.exps.push(response.data)
            this.expAddModal.show = false
        },
        showDeleteExpModal(index){
            this.expDeleteModal.index = index
            this.expDeleteModal.show = true
        },
        async deleteExp(){
            const response = await axios.delete(`/api/v1/labs/exp/${this.exps[this.expDeleteModal.index].id}`)
            this.exps.splice(this.expDeleteModal.index, 1)
            this.expDeleteModal.show = false
        }
    },
    computed: {
        ...mapGetters([
            'class_id',
        ]),
    }
})
</script>
