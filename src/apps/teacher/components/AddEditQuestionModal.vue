<template>

    <div v-if="show" class="h-full overflow-scroll form flex flex-col justify-center bg-cardclr text-white px-16 py-14 text-center absolute top-0 right-0 bottom-0 left-0">
        
        <h1 class="text-2xl mt-12 text-blue-600"> {{ header }} </h1><br>

        <form class="w-full pr-12 pt-10" @submit.prevent>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/4">
                <label class="block  md:text-right mb-1 md:mb-0 pr-4" for="title">Question Title
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="text" name="title" v-model="formData.title" class="rounded bg-gray-600 text-black w-full py-1 px-4" id="inline-full-name">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/4">
                <label class="block md:text-right mb-1 md:mb-0 pr-4" for="question">Question: 
                </label>
                </div>
                <div class="md:w-2/3">
                <textarea name="question" cols="30" rows="10" :value="formData.question" @input="formData.question = $event.target.value"
                class="rounded bg-gray-600 text-black w-full py-1 px-4" id="inline-password" ></textarea>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/4">
                <label class="block  md:text-right mb-1 md:mb-0 pr-4" for="language">Language:
                </label>
                </div>
                <div class="">
                <select @change="selectLang" class="rounded bg-gray-600 text-black min-w-20 py-1 px-4">
                    <option disabled :selected="formData.language === undefined" value> -- select an option -- </option>
                    <option v-for="lang in languages" :key="lang.id" :value="lang.id" :selected="lang.id == formData.language">{{ lang.language }}</option>
                </select>
                </div>

                <label class="block md:text-right mb-1 md:mb-0 pr-4 ml-12" for="mark">Mark:
                </label>
                <input type="number" name="mark" v-model="formData.mark" class="rounded bg-gray-600 text-black w-24 py-1 px-4" id="inline-full-name">

            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/4">
                    <label class="block md:text-right mb-1 md:mb-0 pr-4" for="answer">Correct Answer: </label>
                </div>
                <div class="">
                    <a v-if="formData.answer !== ''" :href="formData.answer" target="_blank">Answer</a>
                    <input class="bg-gray-900 rounded" type="file" name="answer" @change="setAnsFile($event)">
                </div>
            </div>
            

            <div class="md:flex md:items-center mt-4 mb-6 text-blue-500">
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
                    <a :href="testcase.inputUrl" target="_blank">Input {{ testcase.tc_number }}</a>
                </div>
                <div class="md:w-1/5">
                    <a :href="testcase.outputUrl" target="_blank">Output {{ testcase.tc_number }}</a>
                </div>
                <div class="md:w-1/5">
                    {{ testcase.mark }}
                </div>
                <div class="md:w-1/5">
                    {{ testcase.hidden }}
                </div>
                <div class="md:w-1/5">
                    <span class="material-symbols-outlined cursor-pointer" @click="">edit</span>
                    <span class="material-symbols-outlined cursor-pointer" @click="showDeleteTestcase(index)">delete</span>
                </div>
            </div>
            <button @click="showAddTestcaseModal" class="bg-gray-400 text-black w-44 rounded">+ Add Testcase</button>
            
            <div class="md:flex md:items-center mt-6">
                
                <div class="md:w-full">
                
                <button class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white" @click="$emit('cancel')"> Cancel </button>
                <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="saveQuestion"> Save </button>
                </div>
            </div>
        </form>
    </div>
          
    <modal :show="testcaseAddModal.show" @cancel="testcaseAddModal = false" @confirm="addTestcaseFile">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Add new testcase</h1>
        </template>
        <template #content>

            <div class="w-full mt-4">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="infile">Choose Input File: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input class="rounded bg-gray-900" name="infile" type="file" @change="setInFile($event)">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="outfile">Choose Output File: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input class="rounded bg-gray-900" name="outfile" type="file" @change="setOutFile($event)">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="marks">Marks: </label>
                    </div>
                    <div class="">
                        <input class="bg-gray-600 text-black rounded w-14" name="marks" type="number" v-model="testcaseAddModal.mark">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="hidden">Hidden </label>
                    </div>
                    <div class="">
                        <input class="bg-gray-600 text-black rounded" type="checkbox" name="hidden" v-model="testcaseAddModal.hidden">
                    </div>
                </div> 
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Add
        </template>
    </modal>
    <modal :show="testcaseDeleteModal.show" @cancel="testcaseDeleteModal.show = false" @confirm="deleteTestcase()">
        <template #header>
            <h1>You sure you want to delete this testcase?</h1>
        </template>
        <template #content>
            <h2 class="mt-4 text-gray-400">Testcase {{ testcases[testcaseDeleteModal.index].tc_number }}</h2>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Delete
        </template>
    </modal>

</template>

<script>
import axios from "axios"
import Modal from "@/components/Modal.vue"


export default({
    name: 'AddEditQuestionModal',
    props: {
        pageType: {
            type: String,
            default: 'lab'
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
                question: '',
                language: Number,
                mark: Number,
                answer: '',
                answerFile: undefined,
            },
            testcases: [],
            testcaseAddModal: {
                show: false,
                input: undefined,
                output: undefined,
                mark: 0,
                hidden: false,
            },
            testcaseDeleteModal:{
                show: false,
                index: undefined,
            },
            _edit: undefined,
            languages: [],
        }
    },
    computed:{
        header(){
            if (this._edit) {
                return 'Edit Question'
            }else{
                return 'Add Question'
            }
        },
        apiUrl(){
            if (this.pageType === 'lab'){
                return '/api/v1/labs'
            }else if (this.pageType === 'exam'){
                return '/api/v1/labexams'
            }
        },
    },
    async mounted(){
        await this.getLanguages()
    },
    watch: {
        show(){
            this._edit = this.edit
            if(this._edit){
                this.getQuestion(this.id)
            }else{
                this.formData.question = ''
                this.formData.title = ''
                this.formData.language = undefined
                this.formData.mark = undefined
                this.formData.answer = ''
                this.formData.answerFile = undefined
                this.testcases = []
            }
        },
    },
    methods: {
        async getQuestion(id){
            const response = await axios.get(`${this.apiUrl}/question/${id}`)
            this.formData.title = response.data.title
            this.formData.question = response.data.question
            this.formData.language = response.data.language
            this.formData.mark = response.data.mark
            this.testcases = response.data.testcases
            this.formData.answer = (response.data.answer !== null)?(process.env.VUE_APP_ROOT_MEDIA + response.data.answer):''
            this.formData.answerFile = undefined

            this.testcases.forEach(testcase => {
                testcase.inputUrl = process.env.VUE_APP_ROOT_MEDIA + testcase.input_file
                testcase.outputUrl = process.env.VUE_APP_ROOT_MEDIA + testcase.output_file
            });
        },
        async createQuestion(id){
            let data = new FormData()
            data.append('title', this.formData.title)
            data.append('question', this.formData.question)
            data.append('language', this.formData.language)
            data.append('mark', this.formData.mark)
            data.append('answer', this.formData.answerFile)
            const response = await axios.post(`${this.apiUrl}/question/${id}`,
            data, {
                headers: {"Content-Type": "multipart/form-data",},
            })
            this.q_id = response.data.id
            this.formData.answer = response.data.answer
        },
        async saveQuestion(){
            if (!this._edit){
                this.createQuestion(this.id)
                this.$emit('saved')
            }else{
                let data = new FormData()
                data.append('title', this.formData.title)
                data.append('question', this.formData.question)
                data.append('language', this.formData.language)
                data.append('mark', this.formData.mark)
                data.append('answer', this.formData.answerFile)
                const response = await axios.put(`${this.apiUrl}/question/${this.id}`,
                data, {
                    headers: {"Content-Type": "multipart/form-data",},
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
            data.append('hidden', this.testcaseAddModal.hidden)
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
            console.log(this.id, this.q_id, this._edit);
            if(!this._edit){
                await this.createQuestion(this.id)
                await this.createTestcase(this.q_id)
                this._edit = true
            }else{
                await this.createTestcase(this.id)
            }
            this.testcaseAddModal.input =  undefined
            this.testcaseAddModal.output = undefined
            this.testcaseAddModal.mark = 0
            this.testcaseAddModal.show = false
        },
        showDeleteTestcase(index){
            this.testcaseDeleteModal.index = index
            this.testcaseDeleteModal.show = true
        },
        deleteTestcase(){
            const response = axios.delete(`${this.apiUrl}/testcase/${this.testcases[this.testcaseDeleteModal.index].id}`)
            this.testcases.splice(this.testcaseDeleteModal.index, 1)
            this.testcaseDeleteModal.show = false
        },
        selectLang(event){
            this.formData.language = parseInt(event.target.value)
            console.log(this.formData.language);
        },
        async getLanguages(){
            const response = await axios.get('/api/v1/editor/languages')
            this.languages = response.data
        },
        setAnsFile(event){
            this.formData.answerFile = event.target.files[0]
        }
    },
    components: {
        Modal,
    }
})
</script>