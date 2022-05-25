<template>

    <div class="content">
        <div class="header">
            <p> Your Profile </p>
        </div>
        <div class="profile py-16 px-9 text-white">
            <div class="profile">
                <profile-image class="w-40" :src="user.image?user.image:'/static/images/profile.png'" alt="student picture"/>
                <h2>{{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}</h2>
                <p>S{{ user.profile.semester }} - {{ user.profile.department.dept_code }} - {{ user.profile.rollno }}</p>
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
                    S{{ user.profile.semester }}
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
import ProfileImage from '@/components/ProfileImage.vue'
import { mapGetters } from 'vuex'

export default({
    name: 'Profile',
    components: {
        ProfileImage,
    },
    async mounted(){
        document.title = 'Profile'
        await this.getProfile()
    },
    data(){
        return{
            title: "Your Profile",
        }
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    }
})
</script>