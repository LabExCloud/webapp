<template>

    <div v-if="show" class="form flex flex-col justify-center bg-cardclr text-white px-16 py-14 text-center absolute top-0 right-0 bottom-0 left-0">
        
        <h1 class="text-xl"> {{ header }} </h1><br>

        <form class="w-full pr-12 pt-10">
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="questionNo">Question No: 
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="number" name="questionNo" v-model="formData.questionNumber" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="question">Question: 
                </label>
                </div>
                <div class="md:w-2/3">
                <textarea name="question" cols="30" rows="10" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" ></textarea>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="language">Language:
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="number" name="language" v-model="formData.language" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="mark">Mark:
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="number" name="mark" v-model="formData.mark" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                </div>
            </div>

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/5">
                    Input
                </div>
                <div class="md:w-1/5">
                    Output
                </div>
                <div class="md:w-1/5">
                    Marks
                </div>
                <div class="md:w-1/5">
                    Hidden
                </div>
                <div class="md:w-1/5">
                    Actions
                </div>
            </div>
            <div class="md:flex md:items-center mb-6" v-for="(testcase, index) in testcases" :key="index">
                <div class="md:w-1/5">
                    <a :href="testcase.inputUrl">Input {{ testcase.tc_number }}</a>
                </div>
                <div class="md:w-1/5">
                    <a :href="testcase.outputUrl">Output {{ testcase.tc_number }}</a>
                </div>
                <div class="md:w-1/5">
                    {{ testcase.mark }}
                </div>
                <div class="md:w-1/5">
                    {{ testcase.hidden }}
                </div>
                <div class="md:w-1/5">
                    <span class="material-symbols-outlined cursor-pointer" @click="">edit</span>
                    <span class="material-symbols-outlined cursor-pointer" @click="">delete</span>
                </div>
            </div>
            <button @click="addTestcase" class="bg-gray-500 text-black w-44 rounded">+ Add Testcase</button>
            
            <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                
                <button class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white" @click="$emit('cancel')"> Cancel </button>
                <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="$emit('confirm')"> Confirm </button>
                </div>
            </div>
        </form>
    </div>
          

</template>

<script>
import axios from "axios"



export default({
    name: 'AddEditQuestionModal',
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            default: false,
        },
        id: {
            type: Number,
            required: true,
        },
        edit: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            formData: {
                questionNumber: Number,
                question: String,
                language: Number,
                mark: Number,
            },
            testcases: [],
        }
    },
    computed:{
        header(){
            if (this.edit) {
                return 'Edit Question'
            }else{
                return 'Add Question'
            }
        }
    },
    async mounted(){
        if(this.edit){
            this.getQuestion(this.id)
        }
    },
    methods: {
        async getQuestion(id){
            const response = await axios.get(`${this.apiUrl}/question/${id}`)
            this.formData.questionNumber = response.data.question_number
            this.formData.question = response.data.question
            this.formData.language = response.data.language
            this.formData.mark = response.data.mark
            this.testcases = response.data.testcases

            this.testcases.forEach(testcase => {
                testcase.inputUrl = process.env.VUE_APP_ROOT_MEDIA + testcase.input_file
                testcase.outputUrl = process.env.VUE_APP_ROOT_MEDIA + testcase.output_file
            });
        }
    }
})
</script>