<template>
    <div class="top_navbar">
        <div class="hamburger">
            <!-- <a href="#">
                <i class="fas fa-bars"></i>
            </a> -->
            <p>{{ title }}</p>
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
    name: 'Exam',
    data(){
        return{
            title: "Your Exams"
        }
    }
})
</script>
