<template>
    
    <div class="profile">
        <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg" alt="student picture">
        <h3> {{ student_name }} </h3>
        <p> S7 - 51 </p>
    </div>
    <ul>
        <li>
            <a href="../lab/index.html" class="active">
                <span class="icon"><i class="fas fa-desktop"></i></span>
                <span class="item">Lab</span>
            </a>
        </li>
        <li>
            <a href="../exam/index.html">
                <span class="icon"><i class="far fa-keyboard"></i></span>
                <span class="item">Exam</span>
            </a>
        </li>
        <li>
            <a href="../resources/index.html">
                <span class="icon"><i class="fas fa-book"></i></span>
                <span class="item">Resources</span>
            </a>
        </li>
        <li>
            <a href="../profile/settings.html">
                <span class="icon"><i class="fas fa-cog"></i></span>
                <span class="item">Profile Settings</span>
            </a>
        </li>
        <li>
            <a href="../../index.html">
                <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
                <span class="item">Logout</span>
            </a>
        </li>
    </ul>
    
</template>

<script>
export default {
    name: 'NavMenu',
    props: {
        studentname: '',
        items: []
    }
}
</script>