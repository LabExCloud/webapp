<template>
    <div class="top_navbar">
        <div class="hamburger">
            <!-- <a href="#">
                <i class="fas fa-bars"></i>
            </a> -->
            <p>{{ title }}</p>
        </div>
    </div>
    <div class="search-box">
        <input type="search" id="search" placeholder="Search Labs" />
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
</template>

<script>

export default({
    name: 'Labs',
    data(){
        return{
            title: "Your Lab works",
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
