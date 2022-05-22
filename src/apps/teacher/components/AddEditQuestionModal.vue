<template>

        <div v-if="show" class="form flex flex-col justify-center mx-12 bg-cardclr text-white border border-borderclr px-16 py-14 rounded-2xl text-center">
            
                <h1 class="text-xl"> Add Question </h1><br>
            

            <form class="w-full max-w-sm">
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="questionNo">Question No: 
                    </label>
                    </div>
                    <div class="md:w-2/3">
                    <input type="number" name="questionNo" v-model="formData.questionNumber" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="question">Question: 
                    </label>
                    </div>
                    <div class="md:w-2/3">
                    <textarea name="question" cols="30" rows="10" v-model="formData.language" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" ></textarea>
                    </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="language">Language:
                    </label>
                    </div>
                    <div class="md:w-2/3">
                    <input type="number" name="language" v-model="formData.language" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="mark">Mark:
                    </label>
                    </div>
                    <div class="md:w-2/3">
                    <input type="number" name="mark" v-model="formData.mark" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
                    </div>
                </div>


                
                <div class="md:flex md:items-center">
                    <div class="md:w-1/3"></div>
                    <div class="md:w-2/3">
                    
                    <button class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white" @click="$emit('cancel')"> Cancel </button>
                    <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="$emit('confirm')"> Confirm </button>
                    </div>
                </div>
            </form>
        </div>
          

</template>

<script>


export default({
    name: 'AddEditQuestionModal',
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