<template>
<div class="section">
    <div class="top_navbar">
        <div class="hamburger">
            <p>{{ title }}</p>
        </div>
    </div>
    <div class="search-box">
        <!-- <span class="icon"><font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon></span> -->
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
        <LabItem/>
    </div>
</div>
</template>

<script>
import LabItem from '@/components/LabItem.vue'

export default({
    name: 'Labs',
    components: {
        LabItem
    },
    mounted(){
        document.title = 'Labs'
    },
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
