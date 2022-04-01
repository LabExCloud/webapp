<template>
    <div class="menu-sidebar">
        <div class="profile">
            <img :src="user.profile.get_image" alt="student picture">
            <h3>{{ user.first_name }} {{ user.last_name }}</h3>
            <p>S{{ user.profile.semester }} - {{ user.profile.rollno }}</p>
        </div>
        <ul>
            <li>
                <router-link to="/labs">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'desktop']"></font-awesome-icon></span>
                    <span class="item">Lab</span>
                </router-link>
            </li>
            <li>
                <router-link to="/exam">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'keyboard']"></font-awesome-icon></span>
                    <span class="item">Exam</span>
                </router-link>
            </li>
            <li>
                <router-link to="/resources">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'book']"></font-awesome-icon></span>
                    <span class="item">Resources</span>
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon></span>
                    <span class="item">Profile Settings</span>
                </router-link>
            </li>
            <li>
                <router-link to="/login">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'sign-out-alt']"></font-awesome-icon></span>
                    <span class="item">Logout</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default({
    name: 'Navigation',
    data(){
        return {
            user: {
                profile: {}
            },
        }
    },
    methods: {
        getProfile(){
            axios({
                method: 'get',
                url: '/api/v1/profile/isebella',
            }).then(response => this.user = response.data)
        },
    },
    mounted(){
        this.getProfile()
    },
})
</script>
