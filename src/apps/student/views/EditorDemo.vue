<template>

    <div class="content">
        <div class="header">
            <p> Editor Demo </p>
        </div>

        <div class="row">
            <div class="col" style="width:500px">
                <button @click="getResult"  style="float:right;">Run</button>
                <select @change="selectLang" style="float:right;">
                <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.language }} - {{ lang.version }}</option>
                </select>
                <Editor style="margin-top: 30px; width: 500px; height: 600px" :language="language.editor_lang" v-model="code" theme="vs-dark"/>
            </div>
            <div class="col" style="vertical-align:top;">
                <div class="output" style="vertical-align:top; margin-top:30px;" >
                    <div v-if="isOutputExist" v-html="htmlOutput"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import piston from 'piston-client'
import axios from 'axios'
import AnsiUp from 'ansi_up'

import Editor from '@/components/Editor.vue'
import { languages } from 'monaco-editor/esm/metadata'

export default({
    name: 'EditorDemo',
    async mounted(){
        document.title = 'Editor Demo'
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
        }
    },
    methods: {
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


<style>
.row {
    display: table;
    width: 100%; /*Optional*/
    table-layout: fixed; /*Optional*/
    border-spacing: 10px; /*Optional*/
}
.col {
    display: table-cell;
    align-content:flex-start;
    height: 600px;
    padding-right: 10px;
}
.output{
    background: black;
    color: white;
    height: 500px;
    padding: 5px 10px;
    font-family: 'Courier New', Courier, monospace;
}
</style>