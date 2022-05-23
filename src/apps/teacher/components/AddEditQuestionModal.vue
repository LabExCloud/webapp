<template>

    <div v-if="show" class="form flex flex-col justify-center bg-cardclr text-white px-16 py-14 text-center absolute top-0 right-0 bottom-0 left-0">
        
        <h1 class="text-xl"> {{ header }} </h1><br>

        <form class="w-full pr-12 pt-10" @submit.prevent>
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
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="title">Question Title
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="text" name="title" v-model="formData.title" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="question">Question: 
                </label>
                </div>
                <div class="md:w-2/3">
                <textarea name="question" cols="30" rows="10" :value="formData.question" @input="formData.question = $event.target.value"
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" ></textarea>
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
            <button @click="showAddTestcaseModal" class="bg-gray-500 text-black w-44 rounded">+ Add Testcase</button>
            
            <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                
                <button class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white" @click="$emit('cancel')"> Cancel </button>
                <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="saveQuestion"> Save </button>
                </div>
            </div>
        </form>
    </div>
          
    <modal :show="testcaseAddModal.show" @cancel="testcaseAddModal = false" @confirm="addTestcaseFile">
        <template #header>
            <h1>Add new testcase</h1>
        </template>
        <template #content>
            <label for="infile">Choose Input File: </label><input name="infile" type="file" @change="setInFile($event)"><br>
            <label for="outfile">Choose Output File: </label><input name="outfile" type="file" @change="setOutFile($event)"><br>
            <label for="marks">Marks: </label><input name="marks" type="number" v-model="testcaseAddModal.mark">
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Add
        </template>
    </modal>

</template>

<!-- 
    TODO: testcase hidden checkbox
    TODO: testcase delete
    TODO: testcase edit (thonniyaal vakkam)   
 -->

<script>
import axios from "axios"
import Modal from "@/components/Modal.vue"


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
            q_id: undefined,
            formData: {
                title: '',
                questionNumber: Number,
                question: '',
                language: Number,
                mark: Number,
            },
            testcases: [],
            testcaseAddModal: {
                show: false,
                input: undefined,
                output: undefined,
                mark: 0,
            }
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
    },
    watch: {
        show(){
            if(this.edit){
                this.getQuestion(this.id)
            }else{
                this.formData.questionNumber = undefined
                this.formData.question = ''
                this.formData.language = undefined
                this.formData.mark = undefined
                this.testcases = []
            }
        },
    },
    methods: {
        async getQuestion(id){
            const response = await axios.get(`${this.apiUrl}/question/${id}`)
            this.formData.questionNumber = response.data.question_number
            this.formData.title = response.data.title
            this.formData.question = response.data.question
            this.formData.language = response.data.language
            this.formData.mark = response.data.mark
            this.testcases = response.data.testcases

            this.testcases.forEach(testcase => {
                testcase.inputUrl = process.env.VUE_APP_ROOT_MEDIA + testcase.input_file
                testcase.outputUrl = process.env.VUE_APP_ROOT_MEDIA + testcase.output_file
            });
        },
        async createQuestion(id){
            const response = await axios.put(`${this.apiUrl}/question/${id}`,{
                question_number: this.formData.questionNumber,
                title: this.formData.title,
                question: this.formData.question,
                language: this.formData.language,
                mark: this.formData.mark
            })
            this.q_id = response.data.id
        },
        async saveQuestion(){
            if (this.edit){
                this.createQuestion(this.id)
                this.$emit('saved')
            }else{
                const response = await axios.post(`${this.apiUrl}/question/${this.id}`,{
                    question_number: this.formData.questionNumber,
                    title: this.formData.title,
                    question: this.formData.question,
                    language: parseInt(this.formData.language),
                    mark: this.formData.mark
                })
                this.$emit('saved')
            }
        },
        showAddTestcaseModal(){
            this.testcaseAddModal.input = undefined
            this.testcaseAddModal.output = undefined
            this.testcaseAddModal.show = true
        },
        setInFile(event){
            this.testcaseAddModal.input = event.target.files[0]
        },
        setOutFile(event){
            this.testcaseAddModal.output = event.target.files[0]
        },
        async createTestcase(id){
            let data = new FormData()
            data.append('input_file', this.testcaseAddModal.input)
            data.append('output_file', this.testcaseAddModal.output)
            data.append('mark', this.testcaseAddModal.mark)
            data.append('tc_number', this.testcases.length + 1)
            console.log(this.testcases.length + 1);
            const response = await axios.post(
                `${this.apiUrl}/testcase/${id}`, 
                data,
                {
                    headers: {"Content-Type": "multipart/form-data",},
                }
            )
            this.testcases.push(response.data)
        },
        async addTestcaseFile(){
            console.log(this.q_id, this.id);
            if(!this.edit){
                await this.createQuestion()
                await this.createTestcase(this.q_id)
            }else{
                await this.createTestcase(this.id)
            }
            this.testcaseAddModal.input =  undefined
            this.testcaseAddModal.output = undefined
            this.testcaseAddModal.mark = 0
            this.testcaseAddModal.show = false
        },
    },
    components: {
        Modal,
    }
})
</script>