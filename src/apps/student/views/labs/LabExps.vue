<template>
    <div class="content">
        <div class="header">
            <p> Experiments </p>
        </div>

        <div class="search-sort-box">
                <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Exps"/>
                <div class="sort-box">
                    <label class="text-white" for="sort">sort: </label>
                    <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sort" name="sort">
                        <option value="recent" selected>Recent</option>
                        <option value="star">Starred</option>
                        <option value="date">Date</option>
                        <option value="alph">Alphabet</option>
                    </select>
                </div>   
        </div>

        
        <!-- {{ exps }} -->
        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <div v-for="exp in exps" :key="exp.id" class="h-36 border border-borderclr rounded-2xl bg-cardclr">
                <p class="mx-4 mt-5"> {{exp.exp_name}} - {{ exp.questions.length}} Questions. </p>
                <ul class="px-6 py-4">
                    <li class="cursor-pointer" v-for="question in exp.questions" :key="question.id" @click="clickQuestion(question.id)">
                        {{question.question_number}} ) {{ question.question }} - {{ question.mark}} marks
                    </li>
                </ul>
            </div>

            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 4</div>
        </div>
        
    </div>

</template>

<script>
import axios from 'axios'
// import LabItem from '../../components/LabItem.vue'

export default({
    name: 'LabExps',
    // components: {
    //     LabItem
    // },
    mounted(){
        document.title = 'Exps'
        this.getExps()
    },
    data(){
        return{
            exps: {}
        }
    },
    methods: {
        async getExps(){

            var labid = this.$route.params.labid;
            var url = `/api/v1/labs/${labid}`;

            const response = await axios.get(url);
            this.exps = response.data;
        },
        clickQuestion(id){
            this.$router.push(`/labs/exp/${id}`)
        },
        
    },
})
</script>
