<template>
    <modal :show="show" @cancel="$emit('cancel')" @confirm="">
        <template #header>{{ header }}</template>
        <template #content>
            <label for="questionNo">Question No: </label>
            <input type="number" name="questionNo" v-model="formData.questionNumber"><br>
            <label for="question">Question: </label>
            <textarea name="question" cols="30" rows="10" v-model="formData.language"></textarea><br>
            <label for="language">Language: </label>
            <input type="number" name="language" v-model="formData.language"><br>
            <label for="mark">Mark: </label>
            <input type="number" name="mark" v-model="formData.mark"><br>
        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Save
        </template>
    </modal>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal.vue'

export default({
    name: 'AddEditQuestionModal',
    components: {
        Modal,
    },
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
    }
})
</script>