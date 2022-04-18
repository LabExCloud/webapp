<template>
    <div class="auth">
        <form id="login-form" @submit.prevent="submitForm">
            <input type="text" name="uname" placeholder="Username" required="" v-model="username">
            <input type="password" name="pass" placeholder="Password" required="" v-model="password">
            <div v-if="true">
                <div v-for="error in errors" :key="error" class="flex flex-col justify-center items-center text-red-700">
                    {{ error }}
                </div>
            </div>

            <div class="flex flex-col justify-center items-center py-10">

                <button type="submit"> Login </button>
                <!-- <a class="text-blue-500" href="./labs.html"> SignUp </a> -->

            </div>
        </form>
    </div>
</template>

<style>
.auth{
    @apply flex bg-cardclr mt-20 mb-32 border border-borderclr rounded-xl;
}

.auth form{
    @apply py-8 px-11;
}

.auth input{
    @apply block w-52 my-10 px-16 py-2 border border-black rounded-lg;
}

.auth button{
    @apply w-24 py-1 bg-gray-600 text-white mb-10 border border-black rounded-lg;
}
</style>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default({
    name: 'Login',
    data(){
        return {
            username: '',
            password: '',
            errors: [] // TODO: display this somewhere
        }
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'token',
            'user',
        ]),
        isError(){
            return this.errors.length > 0
        }
    },
    methods: {
        async submitForm(){
            this.errors = []
            axios.defaults.headers.common['Authorization'] = ''
            
            await this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            .catch(e => {
                if(e.message === 'Network Error'){
                    this.errors.push(e.message)
                }else if(e.response.status == 400){
                    this.errors.push('Invalid Username or Password')
                }
            })
            axios.defaults.headers.common['Authorization'] = 'Token ' + this.token

            await this.$store.dispatch('getUser')

            if(this.isAuthenticated){
                if(this.user.is_staff){
                    window.location.href = '/teacher'
                }else{
                    window.location.href = '/student'
                }
            }
        },
    },
    mounted(){
        document.title = 'Login'

        this.$store.commit('INIT')

        if(this.isAuthenticated){
            if(this.user.is_staff){
                window.location.href = '/teacher'
            }else{
                window.location.href = '/student'
            }
        }
    },
})
</script>
