<template>
    {{ date }}
</template>

<script>
export default {
    name: "DateView",
    data(){
        return {
            date: '',
            monthNames: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
        }
    },
    mounted(){
        this.formatDate()
    },
    watch: {
        modelValue(){
            this.formatDate()
        }
    },
    props: {
        modelValue: {
            type: String,
            required: true
        },
    },
    methods: {
        formatDate(){
            const date = new Date(this.modelValue)
            this.date = `${this.monthNames[date.getMonth()]} ${date.getDate()}`
        },
    }
}
</script>