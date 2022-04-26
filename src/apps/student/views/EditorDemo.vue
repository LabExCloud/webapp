<template>

    <div class="content">
        <div class="header">
            <p> Editor Demo </p>
        </div>

        <div class="row">
            <div class="col" style="width:500px">
                <button @click="getResult"  style="float:right;">Run</button>
                <select @change="selectLang" v-model="selectKey" style="float:right;">
                <option v-for="lang in languageSelect" :key="languageSelect.indexOf(lang)" :value="languageSelect.indexOf(lang)">{{ lang.language }} - {{ lang.version }}</option>
                </select>
                <Editor style="margin-top: 30px; width: 500px; height: 600px" :language="language" v-model="code" theme="vs-dark"/>
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
import AnsiUp from 'ansi_up'

import Editor from '@/components/Editor.vue'

export default({
    name: 'EditorDemo',
    mounted(){
        document.title = 'Editor Demo'
        this.getLanguages()
    },
    components: {
        Editor
    },
    data() {
        return {
        ansi: undefined,
        output: {},
        code: '',
        editorLang: '',
        language: '',
        languages: [
            {
                language: 'c++',
                editorLang: 'cpp',
                demo: '#include <iostream>\nusing namespace std;\nint main(){\n\tcout<<"Hello, World! C++";\n\treturn 0;\n}'
            },
            {
                language: 'python',
                editorLang: 'python',
                demo: 'print("Hello, World! Python")'
            },
            
        ],
        selectKey: '',
        languageSelect: [],
        isOutputExist: false,
        }
    },
    methods: {
        async getResult(){
            const client = piston({ server: "https://emkc.org" });
            this.output = await client.execute(this.language, this.code);
            if(this.output){
                this.isOutputExist = true
            }
        
        },

        async getLanguages(){
            const client = piston({ server: "https://emkc.org" });
            const runtimes = await client.runtimes();

            for (const lang in runtimes) {
                if (Object.hasOwnProperty.call(runtimes, lang)) {
                    const element = runtimes[lang];
                    if(this.languages.find(el => {return el.language === element.language}) ){
                        this.languageSelect.push(element)
                    }
                }
            }
        },
        selectLang(){
            this.code = this.languages[this.selectKey].demo
            this.language = this.languages[this.selectKey].language
            this.editorLang = this.languages[this.selectKey].editorLang
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