<template>
    <proctoring v-if="exam" @predictions="predictions"/>

    <!-- need total exp question numbers in API to iterate -->
    <!-- <div class="bg-gray-800 w-7 h-full text-sm text-white">
        <div class="h-12 bg-violet-700 rounded my-2 py-3 px-1"> 1 </div>
        <div class="h-12 bg-violet-700 rounded my-2 py-3 px-1"> 2 </div>
    </div> -->
    
    <div class="bg-cardclr w-[480px] h-screen pr-4 mr-auto text-white pl-2 py-5">
        <p> {{ qn.question }} </p>
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

        <div class="bg-gray-900 w-full h-3/4 realtive">
            <div v-if="noti" class="text-white px-6 py-4 border-0 rounded absolute top-10 right-3 z-10 bg-emerald-500">
                <span class="text-2xl inline-block mr-2 align-middle">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                    </svg>
                </span>
                <span class="inline-block align-middle mr-8">
                    <b>Done 👍</b> - Your code has been submitted!
                </span>
                <button class="absolute bg-transparent text-lg leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" v-on:click="closeNoti()">
                    <span class="material-symbols-outlined text-gray-600">cancel</span>
                </button>
            </div>

            <Editor class="w-full h-full" :language="language.editor_lang" v-model="code" theme="vs-dark"/>
        </div>


        <div class="bg-gray-700 w-full h-6">
            <!-- <span class="px-4 text-sm"> Output </span>
            <span class="px-4 text-sm"> Testcase </span> -->
           <tabs v-model="active">
                <tab>Output</tab>
                <tab>Testcase</tab>
            </tabs>

        </div>
        <div class="bg-gray-500 w-full h-1/3">
            <!-- <div class="w-full h-full px-5 py-4" v-if="isOutputExist" v-html="htmlOutput"></div>    -->
            <tab-panels v-model="active">
                <tab-panel v-show="isOutputExist" v-html="htmlOutput"></tab-panel>
                <tab-panel>Testcase out</tab-panel>
            </tab-panels>
        </div>

    </div>

</template>

<script>
import piston from 'piston-client'
import axios from 'axios'
import AnsiUp from 'ansi_up'

import Editor from '@/components/Editor.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import TabPanels from '@/components/TabPanels.vue'
import TabPanel from '@/components/TabPanel.vue'

import Proctoring from './Proctoring.vue'

import { ref } from "vue";


export default({
    name: 'IDEcomponent',
    

    async mounted(){
        document.title = 'Question'
        await this.getQuestion()
        await this.getLanguages()
    },
    components: {
        Editor,
        Tabs,
        Tab,
        TabPanels,
        TabPanel,
        Proctoring,
    },
    data() {
        return {
            ansi: undefined,
            output: '',
            code: '',
            language: '',
            languages: [],
            isOutputExist: false,
            qn: {},
            ans_id: undefined,
            noti: false,
        }
    },
    methods: {
        predictions(event){
            console.log(event);
        },
        async runTestcases(){
            var mark = 0

            var testcases = []

            for (const key in this.qn.testcases) {
                if (Object.hasOwnProperty.call(this.qn.testcases, key)) {
                    const t = this.qn.testcases[key];
                    const tcr = await this.runTestcase(t)
                    if(tcr.pass){
                        mark += t.mark
                    }
                    testcases.push(tcr)
                }
            }

            return {
                mark,
                testcases
            }
        },
        async runTestcase(t){
            const response1 = await fetch(axios.defaults.baseURL + t.input_file)
            const input = await response1.text()
            const response2 = await fetch(axios.defaults.baseURL + t.output_file)
            const output = await response2.text()

            const client = piston({ server: "https://emkc.org" });
            const response = await client.execute(this.language.piston_lang, this.code, {stdin: input});

            this.output += response.run.stdout

            const pass = response.run.stdout === output
            
            return {
                pass,
                input,
                output,
                stdout: response.run.stdout,
                hidden: t.hidden
            }
        },

        async getQuestion(){

            var qnid = this.$route.params.expid;
            var url = `/api/v1/${this.loc}/question/${qnid}`;

            const response = await axios.get(url);
            this.qn = response.data;

            try{
                const response = await axios.get(`/api/v1/${this.loc}/answer/question/${this.qn.id}`)
                if(response.status == 200){
                    this.ans_id = response.data.id
                    const aresponse = await fetch(axios.defaults.baseURL + response.data.answer)
                    this.code = await aresponse.text()
                }
            }catch(e){

            }
        },
        async getResult(){
            const result = await this.runTestcases()
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
            if(!this.ans_id){
                this.code = await this.getDemoCode(this.language.id)
            }
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
        async showNoti(){
            this.noti = true

            setTimeout(() => {
                this.noti = false;
            }, 2000);
        },

        closeNoti(){
            this.noti = false;
        },

        async submit(){
            
            await this.showNoti(); //change - on success.

            const result = await this.runTestcases()

            let data = new FormData()
            let answer = new File([this.code], "answer.cpp")
            data.append('execution_tries', 2)
            data.append('execution_time', 3600)
            data.append('total_marks', result.mark)
            data.append('answer', answer)

            if(this.ans_id){
                const response = await axios.put(`/api/v1/${this.loc}/answer/${this.ans_id}`,
                    data,
                    {
                        headers: {"Content-Type": "multipart/form-data",},
                    }
                )
            }else{
                const response = await axios.post(`/api/v1/${this.loc}/answer/${this.qn.id}`,
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
            return this.ansi.ansi_to_html(this.output).replace(/\n/gm, '<br>')
        },
        loc(){
            if(this.exam){
                return 'labexams'
            }else{
                return 'labs'
            }
        }
    },
    beforeMount () {
        this.ansi = new AnsiUp()
    },

    setup() {
        const active = ref(0);

        return { active };
    },
    props:{
        exam: {
            type: Boolean,
            default: false
        }
    }
})

</script>