<template>

    <div class="content">
        <div class="header">
            <p> Your Exams </p>
        </div>
        <!-- <div class="flex items-center justify-center p-40 border-4 border-dotted">
          Content...
        </div> -->
        <div class="grid grid-cols-2 gap-10 py-14 px-8 text-white">
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 1</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 4</div>
        </div>
    </div>

<!-- <div class="section">
    <div class="top_navbar">
        <div class="hamburger">
            <p>{{ title }}</p>
        </div>
    </div>
        <div class="search-box">
        <input type="search" id="search" placeholder="Search Exams" />
        <div class="sort-box">
            <label for="sort">sort:</label>&nbsp;
            <select id="sort" name="sort">
                <option value="recent">Recent</option>
                <option value="star">Starred</option>
                <option value="date">Date</option>
                <option value="alph">Alphabet</option>
            </select>
        </div>
    </div>
    <div class="labs-grid-container">
        <div class="lab-items" v-for="item in objectItems" :key="item">
            <p>{{ item }}</p>
        </div>
    </div>
</div> -->
</template>

<script>

export default({
    name: 'Exam',
    mounted(){
        document.title = 'Exam'
    },
    data(){
        return{
            objectItems: {
                key1: 'item one',
                key2: 'item two',
                key3: 'item three',
                key4: 'item four'
            }
        }
    }
})
</script>
