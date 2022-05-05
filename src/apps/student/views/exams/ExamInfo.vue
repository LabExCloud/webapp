<template>
    <div class="content">
        <div class="header">
            <p> Exam Instructions </p>
        </div>

        <div class="w-full h-96">
            <div class="h-96 mx-9 my-12 text-white border border-borderclr rounded-2xl bg-cardclr">

            </div>
        </div>
        
        
    </div>

</template>

<script>
// import axios from 'axios'
// import LabItem from '../../components/LabItem.vue'

export default({
    name: 'ExamInfo',
    // components: {
    //     LabItem
    // },
    mounted(){
        document.title = 'Exps'
        //this.getExps()
    },
    // data(){
    //     return{
    //         exps: {}
    //     }
    // },
    // methods: {
    //     async getExps(){

    //         var labid = this.$route.params.labid;
    //         var url = `/api/v1/labs/${labid}`;

    //         const response = await axios.get(url);
    //         this.exps = response.data;
    //     },
        
    // },
})
</script>
