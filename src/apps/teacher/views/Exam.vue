<template>

    <div class="content">
        <div class="header">
            <p> Lab Exams </p>
        </div>
        
        <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Exams"/>
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md">
                    <router-link to="/demo/addlab">
                        <span class="mx-4">+ New Exam</span>
                    </router-link>
                </button>
            </div>
        </div>

        <!-- <div class="grid grid-cols-2 gap-10 py-14 px-8 text-white">
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 1</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 4</div>
        </div> -->
    </div>
</template>

<script>

export default({
    name: 'Exam',
    mounted(){
        document.title = 'Exam'
    },
    // data(){
    //     return{
    //         objectItems: {
    //             key1: 'item one',
    //             key2: 'item two',
    //             key3: 'item three',
    //             key4: 'item four'
    //         }
    //     }
    // }
})
</script>
