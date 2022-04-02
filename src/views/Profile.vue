<template>

    <div class="content">
        <div class="header">
            <p> Your Profile </p>
        </div>
        <!-- <div class="flex items-center justify-center p-40 border-4 border-dotted">
          Content...
        </div> -->
        <div class="profile py-16 px-9 text-white">
            <div class="profile">
                <img :src="user.profile.get_image" alt="student picture">
                <h2>{{ user.first_name }} {{ user.last_name }}</h2>
                <p>S{{ user.profile.semester }} - {{ user.profile.rollno }}</p>
            </div>

            <div class="grid grid-cols-2 gap-y-4 gap-x-12 py-8">
                <div>
                    Full Name 
                </div>
                <div>
                    {{ user.first_name }} {{ user.last_name }}
                </div>
                
                <div>
                    Semester 
                </div>
                <div>
                    S{{ user.profile.semester }}
                </div>
            
                <div>
                    Roll No
                </div>
                <div>
                    {{ user.profile.rollno }}
                </div>
            
                <div>
                    Username
                </div>
                <div>
                    {{ user.username }}
                </div>
            
                <div>
                    Password
                </div>
                <div>
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
})
</script>