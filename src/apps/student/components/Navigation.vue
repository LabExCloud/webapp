<template>
    <div class="sidepage">
        <div class="profile">
            <profile-image class="w-28" :src="user.image?user.image:'/static/images/profile.png'" alt="student picture"/>
            <h2>{{ user.first_name }} {{ user.last_name }}</h2>
            <p>S{{ user.profile.semester }} - {{ user.profile.department.dept_code }} - {{ user.profile.rollno }}</p>
        </div>
        <div class="navigation">
            <aside>
                <ul>
                <li>
                    <router-link to="/labs">
                        <span class="material-symbols-outlined">desktop_windows</span>

                        <span class="mx-4"> Labs </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/exams">
                        <span class="material-symbols-outlined">notes</span>

                        <span class="mx-4"> Exams </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/resources">
                        <span class="material-symbols-outlined">book</span>

                        <span class="mx-4"> Resources </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/profile">
                        <span class="material-symbols-outlined">settings</span>

                        <span class="mx-4"> Profile Settings </span>
                    </router-link>
                </li>

                <!-- <li>
                    <router-link to="/editor">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            
                        </svg>

                        <span class="mx-4"> Editor Demo </span>
                    </router-link>
                </li> -->

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
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
        profileImage() {
            return process.env.VUE_APP_ROOT_MEDIA + this.user.image
        }
    },
})
</script>
