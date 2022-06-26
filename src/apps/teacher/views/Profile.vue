<template>

    <div class="content">
        <div class="pt-5 pl-5 absolute z-10">
            <button class="text-center text-base w-10 text-white bg-gray-700 border border-black rounded-md" @click="goHome">
                <span class="material-symbols-outlined text-lg text-black">arrow_back</span>
            </button>
        </div>
        <div class="header relative">
            <p> Your Profile </p>
        </div>
        <div class="profile py-16 px-9 text-white">
            <div class="profile">
                <button @click="changeProfileImageModal.show = true">
                    <profile-image class="w-40" :src="user.image?user.image:'/static/images/profile.png'" alt="teacher picture"/>
                </button>
                <h2>{{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}</h2>
                <!-- <p>S{{ user.profile.semester }} - {{ user.profile.department }} - {{ user.profile.rollno }}</p> -->
            </div>

            <div class="grid grid-cols-2 gap-y-4 gap-x-12 py-8">
                <div>
                    Full Name 
                </div>
                <div class="bg-gray-800 rounded px-3 text-gray-300">
                    {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
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
                    <button @click="showChangePasswordModal">Change Password</button>
                </div>   
            </div>

        </div>
    </div>
    <modal :show="changePasswordModal.show" @cancel="changePasswordModal.show = false" @confirm="changePassword">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Change Password</h1>
        </template>
        <template #content>
            <div class="w-full mt-4">
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="pass1">New Password: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input class="rounded bg-gray-600 text-black" name="pass1" type="password" v-model="changePasswordModal.password1">
                    </div>
                </div>
                <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                        <label for="pass2">Enter Again: </label>
                    </div>
                    <div class="md:w-2/3">
                        <input class="rounded bg-gray-600 text-black" name="pass2" type="password" v-model="changePasswordModal.password2">
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center text-red-700">
                    {{ changePasswordModal.error }}
                </div>
                        
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Change 
        </template>
    </modal>
    <modal :show="changeProfileImageModal.show" @cancel="changeProfileImageModal.show = false" @confirm="uploadProfileImage">
        <template #header>
            <h1 class="mb-4 text-xl text-gray-400">Change Profile Picture</h1>
        </template>
        <template #content>
            <div class="w-full mt-4">
                <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />

                <vue-cropper ref="cropper" :aspect-ratio="1" :src="changeProfileImageModal.img" preview=".preview"></vue-cropper>
                        
            </div>

        </template>
        <template #cancel>
            Cancel
        </template>
        <template #confirm>
            Upload
        </template>
    </modal>

</template>


<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import ProfileImage from '@/components/ProfileImage.vue'
import Modal from '@/components/Modal.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default({
    name: 'Profile',
    components: {
        ProfileImage,
        Modal,
        VueCropper
    },
    mounted(){
        document.title = 'Profile'
    },
    computed: {
        ...mapGetters('auth', [
            'user',
        ]),
    },
    data(){
        return{
            title: "Your Profile",
            changePasswordModal: {
                show: false,
                password1: '',
                password2: '',
                error: '',
            },
            changeProfileImageModal: {
                show: false,
                img: undefined,
            }
        }
    },
    methods: {
        showChangePasswordModal(){
            this.changePasswordModal.password1 = ''
            this.changePasswordModal.password2 = ''
            this.changePasswordModal.error = ''
            this.changePasswordModal.show = true
        },
        async changePassword(){
            if (this.changePasswordModal.password1 === this.changePasswordModal.password2){
                this.changePasswordModal.error = ''
                const response = await axios.put('/api/v1/password',{
                    'password': this.changePasswordModal.password1
                })
                this.changePasswordModal.show = false
            }else{
                this.changePasswordModal.error = 'Passwords Does not match'
            }
        },
        goHome(){
            this.$router.push('/')
        },
        setImage(e){
            const file = e.target.files[0]

            const reader = new FileReader()

            reader.onload = (event) => {
                this.changeProfileImageModal.img = event.target.result
                this.$refs.cropper.replace(event.target.result)
            }

            reader.readAsDataURL(file)
        },
        async uploadProfileImage(){
            this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
                let data = new FormData()
                data.append('image', blob, `${this.user.username}.jpg`)
                const response = await axios.put(
                    `/api/v1/profilepicture`, 
                    data,
                    {
                        headers: {"Content-Type": "multipart/form-data",},
                    }
                )
                this.$store.dispatch('auth/getUser')
                this.changeProfileImageModal.show = false
                this.changeProfileImageModal.img = undefined
            })
        }
    },
})
</script>

<style>

.preview {
  width: 100%;
  height: 200px;
  overflow: hidden;
}</style>