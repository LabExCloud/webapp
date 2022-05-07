<template>
    <div class="content">
        <div class="header">
            <p> Exam Instructions </p>
        </div>

        <div class="w-full h-96">

            <div class="flex items-center px-6 pt-10 text-white">
                <img src="https://telegra.ph/file/9326a1797d1e96975cde9.png" alt="subject image" class="h-20 w-20 rounded-2xl">
                <span class="text-2xl pl-10"> Subject Name </span>
                <div class="ml-auto pr-4">
                    <p> Time: 60 min </p>
                    <p> Mark: 50 </p>
                </div>
            </div>

            <p class="text-xl text-white pl-10 pt-12 pb-1"> Instructions: </p>
            <div class="h-96 mx-9 mb-12 text-white border border-borderclr rounded-2xl bg-cardclr">
                <ul class="list-disc px-8 py-4">
                    <li> aaa </li>
                    <li> bbb </li>
                </ul>
            </div>
            <div class="flex justify-center w-full mb-12">
                <a class="text-red-400" href="/demo"> <button class="text-center bg-black rounded border border-gray-300 px-8 py-1"> START </button></a>
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
        document.title = 'Exam Info'
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
