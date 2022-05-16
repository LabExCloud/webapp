<template>

    <div class="bg-gray-800 w-7 h-full">

    </div>
    <div class="bg-cardclr w-[480px] h-screen pr-4 mr-auto text-white pl-2 py-5">
        <p> {{ qn.question }}</p>
        
    </div>

    <div class="flex flex-col bg-white w-screen h-screen">

        <div class="bg-gray-700 w-full h-7">
            <button @click="getResult" class="bg-white float-right">Run</button>
            <select @change="selectLang">
                <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.language }} - {{ lang.version }}</option>
            </select>
        </div>

        <div class="bg-gray-900 w-full h-3/4">
        <Editor class="w-full h-full" :language="language.editor_lang" v-model="code" theme="vs-dark"/>
        </div>


        <div class="bg-gray-700 w-full h-6">

        </div>
        <div class="bg-gray-500 w-full h-1/3">
            <div class="w-full h-full" v-if="isOutputExist" v-html="htmlOutput"></div>   
        </div>

    </div>


</template>

<script>
import piston from 'piston-client'
import axios from 'axios'
import AnsiUp from 'ansi_up'

import Editor from '@/components/Editor.vue'


export default({
    name: 'IDE',

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
        qn: {}
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
