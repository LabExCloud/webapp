<template>

<button @click="$emit('end')">END EXAM</button>
<div class="h-36 border border-borderclr rounded-2xl bg-cardclr">
    <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white" v-if="exam">
        <p class="mx-4 mt-5"> {{exam.exam_name}} - {{ exam.questions.length}} Questions. </p>
        <ul class="px-6 py-4">
            <li class="cursor-pointer" v-for="(question, index) in exam.questions" :key="question.id" @click="clickQuestion(question.id)">
                {{ index + 1 }} ) {{ question.question }} - {{ question.mark}} marks
            </li>
        </ul>
    </div>
</div>
</template>

<script>

export default({
    name: 'ExamQuestionList',
    data(){
        return{
        }
    },
    props: {
        exam: {
            type: Object,
            required: true
        }
    },
    methods:{
        clickQuestion(qid){
            this.$emit('qid', qid)
        }
    }
})

</script>