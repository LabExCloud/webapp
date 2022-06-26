<template>
    <div class="header">
        <p> Exam Instructions </p>
    </div>

    <div class="w-full h-96">

        <div class="flex items-center px-6 pt-10 text-white">
            <img src="https://telegra.ph/file/9326a1797d1e96975cde9.png" alt="subject image" class="h-20 w-20 rounded-2xl">
            <span class="text-2xl pl-10"> Subject Name </span>
            <div class="ml-auto pr-4">
                <p> Time: 60 min </p>
                <p> Mark: 50 </p>
            </div>
        </div>

        <p class="text-xl text-white pl-10 pt-12 pb-1"> Instructions: </p>
        <div class="h-96 mx-9 mb-12 text-white border border-borderclr rounded-2xl bg-cardclr">
            <ul class="list-disc px-8 py-4">
                <li> You must use a functioning webcam and microphone. </li>
                <li> No cell phones or other secondary devices in the room or test area. </li>
                <li> Your desk/table must be clear or any materials except your test-taking device. </li>
                <li> No one else can be in the room with you. </li>
                <li> No talking. </li>
                <li> Each question is worth the same/different marks.  </li>
                <li> During this exam you will/won’t be permitted to review previous questions. </li>
            </ul>
        </div>
        <div class="flex justify-center w-full mb-12">
            <button class="text-center text-red-400 bg-black rounded border border-gray-300 px-8 py-1" @click="$emit('start')"> START </button>
        </div>
    </div>
</template>

<script>

export default({
    name: 'ExamInfo',
})
</script>
