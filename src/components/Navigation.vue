<template>
    <div class="sidepage">
        <div class="profile">
            <img class="w-28" :src="user.get_image" alt="student picture">
            <h2>{{ user.first_name }} {{ user.last_name }}</h2>
            <p>S{{ user.profile.semester }} - {{ user.profile.department_code }} - {{ user.profile.rollno }}</p>
        </div>
        <div class="navigation">
            <aside>
                <ul>
                <li>
                    <router-link to="/labs">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>

                        <span class="mx-4"> Lab </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/exam">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>

                        <span class="mx-4"> Exam </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/resources">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>

                        <span class="mx-4"> Resources </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <span class="mx-4"> Profile Settings </span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>

                        <span class="mx-4"> Logout </span>
                    </router-link>
                </li>

                </ul>

            </aside>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default({
    name: 'Navigation',
    data(){
        return {
            user: {
                profile: {semester:{department:{}}}
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
})
</script>

<style>

.sidepage{
    @apply from-mainclr-150 via-mainclr-200 to-mainclr-200 bg-gradient-to-br;
    @apply flex flex-col w-72 h-screen px-4 py-5 overflow-y-auto border-r border-borderclr;
}

.navigation{
    @apply flex flex-col justify-between mt-6 text-gray-300;
}

.navigation a{
    @apply flex items-center px-4 py-2 mt-5 rounded-md hover:bg-mainclr-200 hover:text-red-600;
}

.navigation a.router-link-active{
    @apply flex items-center px-4 py-2 bg-mainclr-200 hover:text-red-600 rounded-md;
}

.navigation a svg {
    @apply h-5 w-5;
}
</style>