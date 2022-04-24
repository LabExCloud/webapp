<template>
    <div id="editor"></div>
</template>

<script>
export default {
    name: "Editor",
    props: {
        modelValue: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            default: 'vs'
        },
        language: String,
        options: Object,
    },
    model: {
        event: 'change'
    },
    watch: {
        options: {
            deep: true,
            handler(options) {
                if (this.editor) {
                    this.editor.updateOptions(options)
                }
            }
        },

        modelValue(newValue) {
            if (this.editor) {
                if (newValue !== this.editor.getValue()) {
                    this.editor.setValue(newValue)
                }
            }
        },

        language(newVal) {
            if (this.editor) {
                this.monaco.editor.setModelLanguage(this.editor.getModel(), newVal)
            }
        },

        theme(newVal) {
            if (this.editor) {
                this.monaco.editor.setTheme(newVal)
            }
        }
    },

    mounted() {
        const monaco = require('monaco-editor')
        this.monaco = monaco
        this.$nextTick(() => {
            this.initMonaco(monaco)
        })
    },

    beforeDestroy() {
        this.editor && this.editor.dispose()
    },

    methods: {
        initMonaco(monaco) {
            this.$emit('editorWillMount', this.monaco)

            const options = {
                value: this.modelValue,
                theme: this.theme,
                language: this.language
            }

            this.editor = monaco.editor.create(document.getElementById('editor'), options)
            
            this.editor.onDidChangeModelContent(event => {
                const value = this.editor.getValue()
                if (this.modelValue !== value) {
                    this.$emit('update:modelValue', value)
                }
            })

            this.$emit('editorDidMount', this.editor)
        },

        focus() {
            this.editor.focus()
        }
    },
}
</script>