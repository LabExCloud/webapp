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
        <div class="lab-items">
            <p>item one</p>
        </div>
        <div class="lab-items">
            <p>item two</p>
        </div>
        <div class="lab-items">
            <p>item three</p>
        </div>
        <div class="lab-items">
            <p>item four</p>
        </div>
    </div>
</template>

<script>

export default({
    name: 'Labs',
    data(){
        return{
            title: "Your Lab works"
        }
    }
})
</script>
