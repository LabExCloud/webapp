<template>

    <!-- need total exp question numbers in API to iterate -->
    <div class="bg-gray-800 w-7 h-full text-sm text-white">
        <div class="h-12 bg-violet-700 rounded my-2 py-3 px-1"> 1 </div>
        <div class="h-12 bg-violet-700 rounded my-2 py-3 px-1"> 2 </div>
    </div>
    
    <div class="bg-cardclr w-[480px] h-screen pr-4 mr-auto text-white pl-2 py-5">
        <p> {{ qn.question }}</p>
    </div>

    <div class="flex flex-col bg-white w-screen h-screen">

        <div class="bg-gray-700 w-full h-7">
            <button @click="submit" class="bg-black text-sm text-white float-right rounded py-[1px] px-2 mr-4">
                 Submit
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-3 inline rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>

            <button @click="getResult" class="bg-black text-sm text-white float-right rounded py-[1px] px-2 mr-4">
                 Run
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
            </button>
            <select @change="selectLang" class="bg-black text-sm text-white float-right rounded py-[1px] px-2 mr-4">
                <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.language }} - {{ lang.version }}</option>
            </select>
        </div>

        <div class="bg-gray-900 w-full h-3/4">
        <Editor class="w-full h-full" :language="language.editor_lang" v-model="code" theme="vs-dark"/>
        </div>


        <div class="bg-gray-700 w-full h-6">
            <span class="px-4 text-sm"> Output </span>
            <span class="px-4 text-sm"> Testcase </span>
        </div>
        <div class="bg-gray-500 w-full h-1/3">
            <div class="w-full h-full px-5 py-4" v-if="isOutputExist" v-html="htmlOutput"></div>   
        </div>

    </div>

</template>

<script>
import piston from 'piston-client'
import axios from 'axios'
import AnsiUp from 'ansi_up'

import Editor from '@/components/Editor.vue'

export default({
    name: 'IDEcomponent',

    async mounted(){
        document.title = 'Question'
        await this.getQuestion()
        await this.getLanguages()
    },
    components: {
        Editor
    },
    data() {
        return {
        ansi: undefined,
        output: {},
        code: '',
        language: '',
        languages: [],
        isOutputExist: false,
        qn: {},
        ans_id: undefined,
        }
    },
    methods: {

        async getQuestion(){

            var qnid = this.$route.params.expid;
            var url = `/api/v1/labs/question/${qnid}`;

            const response = await axios.get(url);
            this.qn = response.data;
        },
        async getResult(){
            const client = piston({ server: "https://emkc.org" });
            this.output = await client.execute(this.language.piston_lang, this.code);
            if(this.output){
                this.isOutputExist = true
            }
        
        },

        async getLanguages(){
            const response = await axios.get('/api/v1/editor/languages')
            const client = piston({ server: "https://emkc.org" });
            const runtimes = await client.runtimes();

            for(let lang in response.data){
                var d = response.data[lang]
                const p = runtimes.find(obj => {
                    return obj.language == d.piston_lang
                })
                d.version = p.version
                this.languages.push(d)
            }

            this.language = this.languages[0]
            this.code = await this.getDemoCode(this.language.id)
        },

        async getDemoCode(id){
            if(id){
                const response = await axios.get(`/api/v1/editor/democode/${id}`)
                return response.data.demo_code
            }else{
                return ''
            }
        },

        async selectLang(event){
            this.language = this.languages.find(obj => obj.id == parseInt(event.target.value))
            this.code = await this.getDemoCode(this.language.id)
        },

        async submit(){
            let data = new FormData()
            let answer = new File([this.code], "answer.cpp")
            data.append('execution_tries', 2)
            data.append('execution_time', 3600)
            data.append('total_marks', 10)
            data.append('answer', answer)

            if(this.ans_id){
                const response = await axios.put(`/api/v1/labs/answer/${this.ans_id}`,
                    data,
                    {
                        headers: {"Content-Type": "multipart/form-data",},
                    }
                )
            }else{
                const response = await axios.post(`/api/v1/labs/answer/${this.qn.id}`,
                    data,
                    {
                        headers: {"Content-Type": "multipart/form-data",},
                    }
                )
                this.ans_id = response.data.id
            }
        }
    },
    computed: {
        htmlOutput(){
            if(this.output.run){
                return this.ansi.ansi_to_html(this.output.run.output).replace(/\n/gm, '<br>')
            }else{
                return ''
            }
        }
    },
    beforeMount () {
        this.ansi = new AnsiUp()
    },
})

</script>