<template>
    <div class="sidepage" v-if="classs">
        <div class="profile">
            <profile-image class="w-28" :src="user.image" alt="teacher picture"/>
            <h2>{{ user.first_name }} {{ user.last_name }}</h2>
            <p>{{ classs.subject.sub_code }} - {{ classs.subject.sub_name }}</p>
            <p>{{ classs.batch.stream }} - {{ classs.batch.year }}</p>
        </div>
        <div class="navigation">
            <aside>
                <ul>
                <li>
                    <router-link to="/">
                        <span class="material-symbols-outlined">home</span>

                        <span class="mx-4"> Home </span>
                    </router-link>
                </li>

                <li v-if="classs.is_lab">
                    <router-link to="/labs">
                        <span class="material-symbols-outlined">desktop_windows</span>

                        <span class="mx-4"> Lab </span>
                    </router-link>
                </li>

                <li v-if="classs.is_lab">
                    <router-link to="/exam">
                        <span class="material-symbols-outlined">notes</span>

                        <span class="mx-4"> Exam </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/resources">
                        <span class="material-symbols-outlined">book</span>

                        <span class="mx-4"> Resources </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/student">
                        <span class="material-symbols-outlined">school</span>

                        <span class="mx-4"> Student </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/settings">
                        <span class="material-symbols-outlined">settings</span>

                        <span class="mx-4"> Settings </span>
                    </router-link>
                </li>

                <li>
                    <a href="/logout">
                        <span class="material-symbols-outlined">logout</span>

                        <span class="mx-4"> Logout </span>
                    </a>
                </li>

                </ul>

            </aside>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProfileImage from '@/components/ProfileImage.vue'
import { mapGetters } from 'vuex'

export default({
    name: 'Navigation',
    components: {
        ProfileImage,
    },
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
                url: '/api/v1/profile',
            }).then(response => this.user = response.data)
        },
    },
    mounted(){
        this.getProfile()
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    }
})
</script>
