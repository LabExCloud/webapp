<template>

    <div class="content">
        <div class="header">
            <p> Your Profile </p>
        </div>
        <div class="profile py-16 px-9 text-white">
            <div class="profile">
                <img class="w-40" :src="user.get_image" alt="student picture">
                <h2>{{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}</h2>
                <p>S{{ user.profile.semester }} - {{ user.profile.department }} - {{ user.profile.rollno }}</p>
            </div>

            <div class="grid grid-cols-2 gap-y-4 gap-x-12 py-8">
                <div>
                    Full Name 
                </div>
                <div class="bg-gray-800 rounded px-3 text-gray-300">
                    {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
                </div>
                
                <div>
                    Semester 
                </div>
                <div class="bg-gray-800 rounded px-3 text-gray-300">
                    S{{ user.profile.semester.semester }}
                </div>
            
                <div>
                    Roll No
                </div>
                <div class="bg-gray-800 rounded px-3 text-gray-300">
                    {{ user.profile.rollno }}
                </div>
            
                <div>
                    Username
                </div>
                <div class="bg-gray-800 rounded px-3 text-gray-300">
                    {{ user.username }}
                </div>
            
                <div>
                    Password
                </div>
                <div class="bg-gray-800 rounded px-3 text-gray-300">
                    *******
                </div>   
            </div>

        </div>
    </div>

</template>


<script>
import axios from 'axios'

export default({
    name: 'Profile',
    mounted(){
        document.title = 'Profile'
        this.getProfile()
    },
    data(){
        return{
            title: "Your Profile",
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
})
</script>